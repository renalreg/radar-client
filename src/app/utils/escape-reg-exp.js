function escapeRegExp() {
  return function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
}

export default escapeRegExp;

