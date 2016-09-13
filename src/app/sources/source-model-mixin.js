function sourceModelMixinFactory() {
  return {
    getSource: function() {
      if (this.sourceGroup.shortName) {
        return this.sourceGroup.shortName + ' (' + this.sourceType + ')';
      } else {
        return this.sourceType;
      }
    }
  };
}

export default sourceModelMixinFactory;
