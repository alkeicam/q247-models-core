import { Diff } from "../iface/model";

/**
 * Will calculate diff information (resulting code, and original code)
 * for each file from a provided git diff (unified diff format)
 * @param diffText 
 * @returns 
 */
export const parseGitDiff = (diffText:string):Diff.GitDiffResult=>{
    const files = {};
    const lines = diffText.split('\n');
  
    let currentFile = null;
    let original = [];
    let resulting = [];
    let changed = [];
    let inHunk = false;
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
  
      // New file diff
      if (line.startsWith('diff --git')) {
        inHunk = false;
        original = [];
        resulting = [];
        changed = [];
  
        const match = line.match(/^diff --git a\/(.+?) b\/(.+)$/);
        if (match) {
          currentFile = match[1]; // original file path
          (<any>files)[currentFile] = { original: '', resulting: '', changed: [] };
        }
        continue;
      }
  
      // Hunk header
      if (line.startsWith('@@')) {
        inHunk = true;
        continue;
      }
  
      if (!inHunk || !currentFile) continue;
  
      // Actual diff content
      if (line.startsWith('-')) {
        const content = line.slice(1);
        original.push(content);
        changed.push({ type: 'removed', line: content });
      } else if (line.startsWith('+')) {
        const content = line.slice(1);
        resulting.push(content);
        changed.push({ type: 'added', line: content });
      } else if (line.startsWith(' ')) {
        const content = line.slice(1);
        original.push(content);
        resulting.push(content);
      }
    }
  
    // Save file output
    if (currentFile) {
      (<any>files)[currentFile].original = original.join('\n');
      (<any>files)[currentFile].resulting = resulting.join('\n');
      (<any>files)[currentFile].changed = changed;
    }
  
    return files;
}

 /**
* This is a FMW factor function that applies following modification to the score:
* - Is linear when score < upper
* - Smoothly flattens and asymptotically approaches border for score ≥ upper
* 
* f(x)=border−(border−upper)⋅e^(−(x−upper/L) 
* @param score original score <0, inf)
* @param upper up to upper we do not modify the score, after upper we asymptotically reach border
* @param border asymptotic border for scores that are greater than upper
* @param L the bigger the L the slower approach towards border
* @returns modified score <0, border)
*/
export const fmwFactor = (score:number, upper: number = 377, border: number=610, L=100)=>{
   if (score < upper) {
       return score;
   }
   const factor = border - (border - upper) / (1 + (score - upper) / L);
   return factor;
}