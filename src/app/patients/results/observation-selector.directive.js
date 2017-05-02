import _ from 'lodash';

import templateUrl from './observation-selector.html';

/**
 * User interface for selecting an observation from a list.
 *
 * @param {Object} store - injected store object.
 * @returns {Object} - a directive.
 */
function observationSelector(store) {
  return {
    require: 'ngModel',
    templateUrl: templateUrl,
    scope: {
      'patient': '='
    },
    link: function(scope, element, attrs, ngModel) {
      // Mapping between group id and observations
      var groupObservations = {};

      // Currently selected groups (all observations are displayed when set to null)
      scope.group = null;

      // List of groups with at least one observation (displayed as tabs)
      scope.groups = [];

      // Currently selected observation
      scope.observation = null;

      // Currently displayed observations
      scope.observations = [];

      // True while the data is loading
      scope.loading = true;

      // Add functions to the scope
      scope.isActive = isActive;
      scope.use = use;
      scope.setGroup = setGroup;
      scope.saveResults = saveResults;
      /**
       * Called when the model is updated outside the directive.
       *
       * @returns {undefined}
       */
      ngModel.$render = function() {
        scope.observation = ngModel.$viewValue;
      };

      load();

      /**
       * Get the observations for this group.
       *
       * @param {Object} group - the group to get observations for.
       * @returns {array} - the list of observations for this group.
       */
      function getObservations(group) {
          var key = group === null ? null : group.id;
          $("#div-group-date > input").val("");
          if(key==null){
              $("#div-edit-result-list").show();
              $("#div-edit-result").hide();
              $(".form-container").show();
              
          }
          else{
              $("#div-edit-result").show();
              $("#div-edit-result-list").hide();
              $(".form-container").hide();
          }

          $("#div-group-date > input").change(function () {
              var groupDate = $(this).val();

              $(".div-observation-date  > input").each(function (i, obj) {

                  $(this).val(groupDate);


              });


          });
          



          return groupObservations[key] || [];
      }

      /**
       * Set the current group.
       *
       * @param {Object} group - the selected group.
       * @returns {undefined}
       */
      function setGroup(group) {
        scope.group = group;
        scope.observations = getObservations(group);
      }

      function isValidDate(datestr, msgstr){
          return true;
      }

      function strToDateObj(datestr){
          var dateobj = {};
          dateobj.isEmpty = true;
          dateobj.isValid = false;
          dateobj.errMsg = "";
          if(datestr !="")
          {
              dateobj.isEmpty = false;
          }else{
              dateobj.isValid = false;
              dateobj.errMsg = " date required"; 
              return dateobj;
          }

          var dateparts =datestr.split('/');
          var realdate = new Date(dateparts[2],dateparts[1]-1,dateparts[0]); 
          var today = new Date();

          if (realdate > today){
              dateobj.isValid = false;
              dateobj.errMsg = " date must be in the past"; 
              return dateobj;
          }
          dateobj.isValid = true;
          return dateobj;
      }

      function objToValue(val,min,max){
          var objval = {};
          
          objval.isValid = true;
          objval.errMsg = "";

          if(val < min){
              objval.isValid = false;
              objval.errMsg = " must be greater than or equal to " + min;
              return objval;
          }
          if(val > max){
              objval.isValid = false;
              objval.errMsg = " must be less than or equal to " + max;
              return objval;
          }
          return objval;
      }


      function convertToDate(datestr){
          var dateparts =datestr.split('/');
          return dateparts[2] + "-" +  dateparts[1] + "-" + dateparts[0] ;
      }

      function saveResults(patient) {


          var errmsg = "";
          var result = {};
          result.patient = patient.id;
          result.sourceGroup = $("#div-source-group > select").val();
          var msg ="";
          var observations = [];
          var observationsStr = "";

          $(' .result-item').each(function (k, obj) {
              var obs = {};
              var obsStr = {};
              var hasvalue = false;
              var datatype = $(this).find(".observation-data-value").attr("data-observation-type");
              
              switch (datatype) {
                  case "INTEGER":
                      if($(this).find(".observation-data-value").find("input.form-control").val() === parseInt($(this).find(".observation-data-value").find("input.form-control").val(),10))
                      {
                          if($.isNumeric( $(this).find(".observation-data-value").find("input.form-control").val() ))
                          {
                              obs.value = parseInt($(this).find(".observation-data-value").find("input.form-control").val())
                              obsStr.value = $(this).find(".observation-data-value").find("input.form-control").val();
                              hasvalue = true;
                              //alert( obs.value);

                              var objval = {};
                              objval = objToValue(obs.value, parseInt($(this).attr("data-min-val")),parseInt($(this).attr("data-max-val")));
                              if(!objval.isValid)
                              {
                                  errmsg += $(this).attr("data-observation-name") + objval.errMsg + "\n";
                              }
                            

                          }
                          else{
                              errmsg += "Invalid " + $(this).attr("data-observation-name") + " entry \n";
                          }
                      }
                      break;
                  case  "REAL":
                      if($(this).find(".observation-data-value").find("input.form-control").val() !="")
                      {
                          if($.isNumeric( $(this).find(".observation-data-value").find("input.form-control").val() ))
                          {
                              obs.value = parseFloat($(this).find(".observation-data-value").find("input.form-control").val())
                              obsStr.value = $(this).find(".observation-data-value").find("input.form-control").val();
                              hasvalue = true;
                              // alert( obs.value);
                              var objval = {};
                              objval = objToValue(obs.value, parseFloat($(this).attr("data-min-val")),parseFloat($(this).attr("data-max-val")));
                              if(!objval.isValid)
                              {
                                  errmsg += $(this).attr("data-observation-name") + objval.errMsg + "\n";
                              }
                          }
                          else{
                              errmsg += "Invalid " + $(this).attr("data-observation-name") + " entry \n";
                          }
                      }
                      break;
                  case  "STRING":
                      if($(this).find(".observation-data-value").find("input.form-control").val() !="")
                      {
                          
                          obs.value = $(this).find(".observation-data-value").find("input.form-control").val();
                          obsStr.value = $(this).find(".observation-data-value").find("input.form-control").val();
                          hasvalue = true;
                          //alert( obs.value);
                          
                      }
                     
                      break;
                  case   "ENUM":

                      if($(this).find(".observation-data-value").find("select.form-control").val() !="")
                      {

                          var val = {};
                          val.code =  $(this).find(".observation-data-value").find("select.form-control").val();
                          val.description = $(this).find(".observation-data-value").find("select.form-control option:selected").text();
                          obsStr.value  = val.description;
                          obs.value = val;
                          hasvalue = true;
                          // alert( obs.value.code + " " + obs.value.description);
                          
                      }

                      
                      break;
                  default:
                      break;
              } 

              if(hasvalue)
              {

                  obsStr.observation =  $(this).attr("data-observation-name");
                  obsStr.unit =  $(this).attr("data-observation-unit");
                  obs.observation = $(this).attr("data-observation");
                  var obsdate = $(this).find(".div-observation-date").find("input.form-control").val(); 
                  // alert(obsdate);

                  var dateval = strToDateObj(obsdate);

                  if(dateval.isValid)
                  {
                      obs.date = convertToDate(obsdate);
                      observations.push(obs);
                      obsStr.date = obsdate;
                      observationsStr += ("\n" + obsStr.observation + " - " + obsStr.value +  obsStr.unit + " - " + obsStr.date );
                  }
                  else{
                      errmsg += $(this).attr("data-observation-name") + dateval.errMsg + "\n";
                  }

              }
              

             
          });
         
          if(errmsg != "")
          {
              alert(errmsg);
              return false;
          }

          if(observations.length < 1)
          {
              alert("No Result Sumbmitted");
              return false;
          }
          result.observations = observations;

          $.ajax({
              url:  './api/results',
              type: 'POST',
              data: JSON.stringify(result),
              contentType: 'application/json; charset=utf-8',
              dataType: "json",
              success: function (data) {
                  alert("Following result(s) have been saved : \n" + observationsStr);
                  window.location.reload(true);

          },
              error: function (data, errorThrown) { alert("No Result Submitted : \n" + errorThrown) }

          });

   
      }





      /**
       * Returns true if the group is selected.
       *
       * @param {Object} group - a group.
       * @returns {boolean} - true if the group is active.
       */
      function isActive(group) {
        return scope.group === group;
      }

      /**
       * Select an observation.
       *
       * @param {Object} observation - the observation to select.
       * @returns {undefined}
       */
      function use(observation) {
        update(observation);
      }

      /**
       * Update the selected observation.
       *
       * @param {Object} observation - the observation to select.
       * @returns {undefined}
       */
      function update(observation) {
        scope.observation = observation;

        // Update the model value
        ngModel.$setViewValue(observation);
      }

      /**
       * Add an observation to the mapping.
       *
       * @param {Object} group - a group.
       * @param {Object} observation - an observation.
       * @returns {undefined}
       */
      function add(group, observation) {
        var key = group === null ? null : group.id;

        if (groupObservations[key] === undefined) {
          groupObservations[key] = [];
        }

        groupObservations[key].push(observation);
      }

      /**
       * Load the list of observations.
       *
       * @returns {undefined}
       */
      function load() {
        store.findMany('observations').then(function(observations) {
          _.forEach(observations, function(observation) {
            // Add observation to all
            add(null, observation);

            _.forEach(observation.groups, function(group) {
              // Add observation to group
              add(group, observation);
            });
          });

          // Get's patients groups sorted by name
          scope.groups = _.sortBy(scope.patient.getGroups(), 'shortName');

          // Remove groups that don't have any observations
          scope.groups = _.filter(scope.groups, function(group) {
            return getObservations(group).length > 0;
          });

          // Default to first group with observations (otherwise all)
          if (scope.groups.length > 0) {
            setGroup(scope.groups[0]);
          } else {
            setGroup(null);
          }

          // Finished loading
          scope.loading = false;
        });
      }
    }
  };
}

observationSelector.$inject = ['store'];

export default observationSelector;
