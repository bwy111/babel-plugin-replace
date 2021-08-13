module.exports = function() {

  return {
    name: 'babel-plugin-replace',
    visitor: {
      MemberExpression(path, state) {
        const { objNameMap = {} } = state.opts;
        let ASTobject = path.get('object');

        Object.entries(objNameMap).forEach(([key, value]) => {
          if (ASTobject.isIdentifier({ name: key })) {
            ASTobject.node.name = value;
          }
        });
      },

      // 变量替换
      StringLiteral(path, state) {
        const { variable = {}, variableStartsWith = '' } = state.opts;

        if (path.node.value.startsWith(variableStartsWith)) {
          let key = path.node.value.slice(variableStartsWith.length);

          path.node.value = variable[key];
        }
      },
    },
  };
};
