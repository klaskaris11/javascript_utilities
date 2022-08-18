export function clone(o) {
   return JSON.parse(JSON.stringify(o));
}

export const toFormData = (input) => {
   const form = new FormData();
   Object.keys(input).map(
      theKey => {
         if (Array.isArray(input[theKey])) {
            for (let i = 0; i < input[theKey].length; i++) {
               form.append(theKey + '[]', input[theKey][i]);
            }
         } else {
            form.append(theKey, input[theKey])
         }
         return form;
      }
   );
   return form;
};

export const updateObject = (oldObject, updatedProperties) => {
   return {
      ...oldObject,
      ...updatedProperties
   };
};

export const sortArrayOfObjectsByString = (array, fieldNameToSort) => {
   array.sort((a, b) => {
      const nameA = a[fieldNameToSort].toUpperCase();
      const nameB = b[fieldNameToSort].toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
         comparison = 1;
      } else if (nameA < nameB) {
         comparison = -1;
      }
      return comparison;
   });
};

export const sortArrayOfObjectsByNumbers = (array, fieldNameToSort, order) => {
   return array.sort((a, b) => {
      let comparison = 0;
      if (order === "desc") {
         if (a[fieldNameToSort] < b[fieldNameToSort]) {
            comparison = 1;
         } else if (a[fieldNameToSort] > b[fieldNameToSort]) {
            comparison = -1;
         }
      } else {
         if (a[fieldNameToSort] > b[fieldNameToSort]) {
            comparison = 1;
         } else if (a[fieldNameToSort] < b[fieldNameToSort]) {
            comparison = -1;
         }
      }
      return comparison;
   });
};

export const sortArrayOfObjectsByDate = (array, fieldNameToSort, order) => {
   if (order === "desc")
      return array.sort((a, b) => new Date(b[fieldNameToSort]).getTime() - new Date(a[fieldNameToSort]).getTime());
   else if (order === 'asc')
      return array.sort((a, b) => new Date(a[fieldNameToSort]).getTime() - new Date(b[fieldNameToSort]).getTime());
};

export const copyToClipboard = str => {
   const el = document.createElement('textarea');
   el.value = str;
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
};

export const getDateDiffInDays = (startDate) => {
   var timeDiff = (new Date() - new Date(startDate));
   return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}


export const isObject = (input) => {
   if (
      typeof input === 'object' &&
      !Array.isArray(input) &&
      input !== null
   ) {
      return true;
   }
   return false;
}

export function isNumber(o) {
   const rv1 = !isNaN(o);
   const rv2 = typeof (o) === typeof (0);
   if (rv1 === rv2)
      return rv1;
   else {
      console.error(o);
   }
}

export function isFiniteNumber(o) {
   return isNumber(o) && isFinite(o);
}

// https://stackoverflow.com/a/14794066/274677
export function isInt(v) {
   return !isNaN(v) &&
      parseInt(Number(v)) == v &&
      !isNaN(parseInt(v, 10));
}

export function uniqValues(xs) {
   //return new array with distinct values
   // assert.isTrue(Array.isArray(xs));
   function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
   }

   return xs.filter(onlyUnique);
}

export function hasOnlyUniqueValues(xs) {
   //return true if the input array has only unique values
   const uniq = uniqValues(xs);
   return (uniq.length === xs.length);
}

// reports the elements in [bs] that do not appear in [as]
export function deepDiff(as, bs) {
   return bs.filter(x => !as.some(item => JSON.stringify(item) === JSON.stringify(x)));
}

export function compare_dates(d1, d2) {
   // d1 and d2 should be Date objects
   const t1 = d1.getTime();
   const t2 = d2.getTime();
   if (t1 === t2)
      return 0;
   else if (t1 < t2)
      return -1;
   else
      return 1;
}

export function objectContainsValue(obj, value) {
   return Object.values(obj).includes(value);
}

/*
 * num = the number to round
 * func = the Math function to apply
 * prec = the precision needed (in number)
*/
export const roundUsing = (num, func, prec) => {
   var temp = num * Math.pow(10, prec)
   temp = func(temp);
   return temp / Math.pow(10, prec)
}

export const floorRounding = (num, prec) => {
   return roundUsing(num, Math.floor, prec);
}

export const roundRounding = (num, prec) => {
   return roundUsing(num, Math.round, prec);
}

//https://stackoverflow.com/a/6566471
export const toQueryParamsString = (params) => {
   const qs = Object.keys(params).map(key => {
      if (params[key] != null && params[key] != "") {
         return `${key}=${encodeURIComponent(params[key])}`;
      } else {
         return null;
      }
   }).filter(x => x !== null);
   if (!isEmpty(qs)) {
      return qs.join('&');
   } else {
      return null;
   }
}