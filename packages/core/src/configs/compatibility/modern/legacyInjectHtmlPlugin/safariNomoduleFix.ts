const safariNoModuleFix = `(function() {
  var d = document;
  var c = d.createElement('script');
  if (!('noModule' in c) && 'onbeforeload' in c) {
    var s = false;
    d.addEventListener('beforeload', function(e) {
      if (e.target === c) {
        s = true;
      } else if (!e.target.hasAttribute('nomodule') || !s) {
        return;
      }
      e.preventDefault();
    }, true);

    c.type = 'module';
    c.src = '.';
    d.head.appendChild(c);
    c.remove();
  }
}());`;

export { safariNoModuleFix };
