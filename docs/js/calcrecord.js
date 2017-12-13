function get3DRepeatedArray(pData) {
  var vOutArr = [];
  var vCount = Math.round(getRepeatCount(pData)); // Array of integers [0,2,0] 2 attiional copies in y-driection
  for (var ix = 0; ix < vCount; ix++) { // Count x-direction
    vData = cloneJSON(pData);
    vData["summary"] += " (Record "+(ix+1)+")";
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

function scalePosition(pData,pGlobalScale) {
  var vGlobalScale = pGlobalScale || 1.0;
  pData["position"] = scaleStringArray(pData["position"],vGlobalScale);
};

function movePosition(pData,pGlobalMove) {
  var vFloatArr = string2FloatArray(pData["position"]);
  var vMoveVal = 0.0;
  for (var i = 0; i < vFloatArr.length; i++) {
    vMoveVal = pGlobalMove[i] || 0.0;
    vFloatArr[i] += vMoveVal
  };
  pData["position"] = floatArr2String(vFloatArr);
};

function transformPosition(pData,pGlobalScale,pGlobalMove) {
  var vScale = pGlobalScale || 1.0;
  var vFloatArr = string2FloatArray(pData["position"]);
  var vMoveVal = 0.0;
  for (var i = 0; i < vFloatArr.length; i++) {
    vFloatArr[i] *= vScale;
    vMoveVal = pGlobalMove[i] || 0.0;
    vFloatArr[i] += vMoveVal
  };
  pData["position"] = floatArr2String(vFloatArr);
};

function checkAttribs3D(pData) {
  setUndefinedDefault(pData,"rotation","0 0 0");
  setUndefinedDefault(pData,"position","0.0 0.0 0.0");
  setUndefinedDefault(pData,"repeat","0 0 0");
  setUndefinedDefault(pData,"repeatsteps","1.0 1.0 1.0");
};

function setUndefinedDefault(pData,pID,pDefault) {
  if (pData[pID]) {
    if (pData[pID].length < 5) {
      pData[pID] = pDefault;
    };
  } else {
    pData[pID] = pDefault;
  };
};


function getArraySizeXYZ(pData) {
  // pData is Hash for one 3D object/primitive
  // String attribute "sizexyz" will be extracted by getArraySizeXYZ() and
  // parsed into an array of real values, that can be scaled
  var vSizeXYZstr = pData["sizexyz"] || "3.0 2.0 1.0";
  var vOutXYZ = string2FloatArray(vSizeXYZstr);
  // extend array to length 3
  while (vOutXYZ.length < 3) {
    vDefaultValue = 3-vOutXYZ.length;
    vOutXYZ.push(vDefaultValue);
  };
  return vOutXYZ;
};

function real2str(pVal) {
  return pVal.toFixed(2);
}

function string2FloatArray(pString) {
  var vString = pString || "3.0 2.0 1.0";
  //remove ledading and tailing white spaces
  vString = vString.replace(/^\s+|\s+$/g,'');
  // replace german comma "," by a decimal point "."
  vString = vString.replace(/,/g,'.');
  // split String into array at whitespace
  var vStringArr = vString.split(/\s+/);
  var vFloatArr = [];
  var vDefaultValue = 1.0;
  for (var i = 0; i < vStringArr.length; i++) {
    if (isNaN(vStringArr[i])) {
      console.log("blankSepString2FloatArray() parsing Float for '"+vStringArr[i]+"' undefined");
      vDefaultValue = 3-i;
      vFloatArr.push(vDefaultValue);
    } else {
      vFloatArr.push(parseFloat(vStringArr[i]));
    };
  };
  return vFloatArr;
}

function getAttribAframe(pAtt,pSizeXYZ,i,pScale) {
  var vScale = pScale || 1.0;
  var vOut = "";
  if (pSizeXYZ) {
    if ((i>=0) && (i < pSizeXYZ.length)) {
      var vSize = pSizeXYZ[i] * pScale;
      if (vSize) {
        vOut = real2str(vSize);
        if (pAtt && (pAtt != "")) {
          vOut = " "+pAtt+"=\""+vOut+"\"";
        } else {
          vOut = " "+vOut;
        };
      } else {
        console.log("getAttribAframe() calculated vSize undefined");
      }
    } else {
      console.log("getAttribAframe() index i out of range");
    }
  } else {
    console.log("getAttribAframe() pSizeXYZ undefined");
  };
  return vOut;
}
