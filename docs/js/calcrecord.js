function get3DRepeatedArray(pData) {
  var vOutArr = [];
  var vCount = Math.round(getRepeatCount(pData)); // Array of integers [0,2,0] 2 attiional copies in y-driection
  if (vCount == 0) {
    vCount = 1;
  };
  var nr = 0;
  for (var ix = 0; ix < vCount; ix++) { // Count x-direction
    vData = cloneJSON(pData);
    nr = ix+1;
    vData["id"] += "x"+nr;
    vData["summary"] = "Record "+nr+" of ";
    vOutArr.push(vData);
  };
  return vOutArr;
};


function getRepeatCount(pData) {
  // extend array to length 3
  var vCountStr = pData["value"] || "1.0";
  var vValue = 1.0;
  if (isNaN(vCountStr)) {
    console.log("getRepeatCount(pData parsing Float for '"+vCountStr+"' undefined");
  } else {
    vValue = parseFloat(vCountStr);
  };
  return vValue
};


function getGlobalScale() {
  var vFloatStr = $("#globalscale").val() || "1.0";
  return parseFloat(vFloatStr) || 1.0;
};

function getGlobalMove() {
  var vFloatStrArr = $("#globalmove").val() || "0.0 0.0";
  return string2FloatArray(vFloatStrArr) || [0.0,0.0];
};

function scaleStringArray(pStringArr,pScale) {
  var vScale = pScale || 1.0;
  var vFloatArr = string2FloatArray(pStringArr);
  for (var i = 0; i < vFloatArr.length; i++) {
    vFloatArr[i] *= vScale;
  };
  return floatArr2String(vFloatArr);
};


function floatArr2String(pFloatArr) {
  var vOut = "";
  var vSep = "";
  for (var i = 0; i < pFloatArr.length; i++) {
    vOut += vSep + real2str(pFloatArr[i]);
    vSep = " ";
  };
  return vOut
}



function real2str(pVal) {
  return pVal.toFixed(2);
}
