import { Type } from "typescript"

export const tokens = {
  '#': { pattern: /\d/ },
  X: { pattern: /[0-9a-zA-Z]/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleUpperCase() },
  a: { pattern: /[a-zA-Z]/, transform: (v: string) => v.toLocaleLowerCase() },
  '!': { escape: true }
} as any

export function masker (value: any, mask: any, masked = true) {
  return Array.isArray(mask)
         ? dynamicMask(maskit, mask)(value, mask, masked)
         : maskit(value, mask, masked)
}

export function dynamicMask (maskit: any, masks: any[]) {
  masks = masks.sort((a: string | any[], b: string | any[]) => a.length - b.length)
  return function (value: any, mask: any, masked = true) {
    var i = 0
    while (i < masks.length) {
      var currentMask = masks[i]
      i++
      var nextMask = masks[i]
      if (! (nextMask && maskit(value, nextMask, true).length > currentMask.length) ) {
        return maskit(value, currentMask, masked)
      }
    }
    return '' // empty masks
  }
}

export function maskit (value: string | any[], mask: string | any[], masked = true) {
  value = value || ''
  mask = mask || ''
  var iMask = 0
  var iValue = 0
  var output = ''
  while (iMask < mask.length && iValue < value.length) {
    var cMask = mask[iMask]
    var masker = tokens[cMask]
    var cValue = value[iValue]
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
      	output += masker.transform ? masker.transform(cValue) : cValue
        iMask++
      }
      iValue++
    } else {
      if (masker && masker.escape) {
        iMask++ // take the next mask char and treat it as char
        cMask = mask[iMask]
      }
      if (masked) output += cMask
      if (cValue === cMask) iValue++ // user typed the same char
      iMask++
    }
  }

  // fix mask that ends with a char: (#)
  var restOutput = ''
  while (iMask < mask.length && masked) {
    var cMask = mask[iMask]
    if (tokens[cMask]) {
      restOutput = ''
      break
    }
    restOutput += cMask
    iMask++
  }

  return output + restOutput
}
