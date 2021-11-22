export const getDateForServer = (date:Date) => {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
};



export function base64ToArrayBuffer(base64:string) {
  var BASE64_MARKER = ';base64,';
  var base64Index = base64.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
   base64 = base64.substring(base64Index);
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};

export const hourListLoop = () => {
  let hList = [];
  for (let index = 0; index <= 23; index++) {
      hList.push({
          value: index < 10 ? "0" + index.toString() : index.toString(),
      });
  }

  return hList;
}

export const minuteListLoop = () => {
  let hList = [];
  for (let index = 0; index <= 59; index++) {
      hList.push({
          value: index < 10 ? "0" + index.toString() : index.toString(),
      });
  }
  return hList;
};

export const secondListLoop = () => {
  let hList = [];
  for (let index = 0; index <= 59; index++) {
      hList.push({
          value: index < 10 ? "0" + index.toString() : index.toString(),
      });
  }
  return hList;
};