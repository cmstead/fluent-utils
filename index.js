(function (moduleFactory) {
    const isNode = typeof module !== 'undefined' && Boolean(module.exports);
    const fluentUtils = moduleFactory();

    if (isNode) {
        module.exports = fluentUtils;
    } else {
        window.$f = fluentUtils;
    }
})(function () {

    function resolveExpression(expression) {
        return typeof expression !== 'function'
            ? expression
            : expression();
    }

    function ternaryWhen(condition) {
        return {
            then: function then(onTrue) {
                return {
                    else: function (onFalse) {
                        return resolveExpression(condition)
                            ? resolveExpression(onTrue)
                            : resolveExpression(onFalse);
                    }
                }
            }
        }
    }

    return {
        when: ternaryWhen
    };

});