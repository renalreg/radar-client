function frmLayout() {
  return {
    controller: ['$attrs', function($attrs) {
      this.layout = $attrs.frmLayout;
    }]
  };
}

export default frmLayout;
