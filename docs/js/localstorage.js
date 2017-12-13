
function loadConfigLS() {
  loadDOMLS("zoom","5");
  loadDOMLS("mapcenter","4.008157324218748 55.80844844321413");
}

function saveConfigLS() {
  saveDOMLS("zoom");
  saveDOMLS("mapcenter");
}



function loadDOMLS(pID,pDefault) {
  if (typeof(localStorage.getItem(pID)) !== undefined) {
    var vValue = localStorage.getItem(pID);
    if (vValue != "") {
      $("#"+pID).val(vValue);
    } else {
      $("#"+pID).val(pDefault);
    }
  };
}

function saveDOMLS(pID) {
  localStorage.setItem(pID,$("#"+pID).val());
}
