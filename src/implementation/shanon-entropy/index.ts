import { Event } from "../../iface/event";
import { ScalarScore, ScoreModel } from "../../iface/model";

export class ShanonEntropyScoreModelV1 implements ScoreModel {
    
    name = "ShanonEntropyScoreModel";
    version = "1.0";

    score(event: Event): Promise<ScalarScore> {
        const scoreScalar = this._score(event);        
        return Promise.resolve({
            id: `${Math.random().toString(36).substring(2, 12)}`,
            model: {
                name: this.name,
                version: this.version
            },
            event: event,
            score: scoreScalar
        })
    }    
    _score(item:Event){
        let score = 0; // initialize score

        const entropy = this._calculateEntropyScope(item);

        // we promote push with extra score
        if(item.oper == "push"){
            score+=13
            return score;
        }
        let insertDelScore = 0
        // and point for each insertion, deletion
        insertDelScore += item.decoded.changeSummary.inserts;
        insertDelScore += item.decoded.changeSummary.deletions;

        score = entropy.e*insertDelScore/100

        score = parseFloat(score.toFixed(2))
        console.log(score);
        return score;
    }

    _calculateEntropyScope(gitEvent:Event){
        /*
        * @typedef {Object} GitEventEntropyScore
        * @property {number} ec - commit line entropy
        * @property {number} em - commit message entropy
        * @property {number} et - ticket entropy
        * @property {number} er - raw message entropy
        * @property {number} ed - diff entropy
        * @property {number} e - final entropy
        */
        const weights = {
            ec: 1,
            em: 1,
            et: 1,
            er: 1,
            ed: 1
        }        
        const entropy = {            
            ec: this._entropy(Array.from(gitEvent.decoded.commit||""))*weights["ec"],
            em: this._entropy(Array.from(gitEvent.decoded.message||""))*weights["em"],
            et: this._entropy(Array.from(gitEvent.decoded.ticket||""))*weights["et"],
            er: this._entropy(Array.from(gitEvent.gitlog||""))*weights["er"],
            ed: this._entropy(Array.from(gitEvent.diff||""))*weights["ed"],
            e: 0,
            w: {
                ec: this._entropy(gitEvent.decoded.commit?gitEvent.decoded.commit.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[]),
                em: this._entropy(gitEvent.decoded.message?gitEvent.decoded.message.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[]),
                et: this._entropy(gitEvent.decoded.ticket?gitEvent.decoded.ticket.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[]),
                er: this._entropy(gitEvent.gitlog?gitEvent.gitlog.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[]),
                ed: this._entropy(gitEvent.diff?gitEvent.diff.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[]),
            }     
        }

        entropy.e = entropy.ec+entropy.em+entropy.et+entropy.er+entropy.ed;

        return entropy;

    }

    _entropy(arr:any[]){
        const len = arr.length
 
        // Build a frequency map from the string.
        
        const frequencies:any = arr
          .reduce((freq:any, c:any) => {            
            freq[c] = (freq[c] || 0) + 1;             
            return freq;
          }, {})
       
        // Sum the frequency of each character.
        const sum:any = Object.values(frequencies)
          .reduce((sum:any, f:any) => {
            if(isNaN(f)) return sum; // in some strange cases when running in tests sometimes there is a NaN (like "should" or "toString")
            return sum - f/len * Math.log2(f/len)
          }, 0)        
        return parseFloat(sum.toFixed(3));
    }    
}
export class ShanonEntropyScoreModelV2 implements ScoreModel {
    
    name = "ShanonEntropyScoreModel";
    version = "2.0";

    score(event: Event): Promise<ScalarScore> {
        const scoreScalar = this._score(event);        
        return Promise.resolve({
            id: `${Math.random().toString(36).substring(2, 12)}`,
            model: {
                name: this.name,
                version: this.version
            },
            event: event,
            score: scoreScalar
        })
    }    
    _score(item:Event){
        let score = 0; // initialize score

        const entropy = this._calculateEntropyScope(item);
        
        let sizeScore = 0
        // and point for each insertion, deletion
        sizeScore += item.decoded.changeSummary.inserts;
        sizeScore += item.decoded.changeSummary.deletions;

        // score = entropy.e*insertDelScore/100
        const L = 3;
        const k = 0.001;
        const sizeCoefficient = L*(1-Math.exp(-k*sizeScore))
        score = entropy.e*sizeCoefficient;

        // we promote push with extra score
        if(item.oper == "push"){
            score*=1.05            
        }                
        score = parseFloat(score.toFixed(2))
        console.log(score);
        return score;
    }

    _calculateEntropyScope(gitEvent:Event){
        /*
        * @typedef {Object} GitEventEntropyScore
        * @property {number} ec - commit line entropy
        * @property {number} em - commit message entropy
        * @property {number} et - ticket entropy
        * @property {number} er - raw message entropy
        * @property {number} ed - diff entropy
        * @property {number} e - final entropy
        */
        const weights = {
            ec: 1,
            em: 1.1,
            et: 1,
            er: 1,
            ed: 1
        }        
        const weights2 = {
            ec: 1,
            em: 1.1,
            et: 0,
            er: 2.1,
            ed: 2.45
        }        
        const entropy = {            
            ec: this._entropy(Array.from(gitEvent.decoded.commit||""))*weights["ec"],
            em: this._entropy(Array.from(gitEvent.decoded.message||""))*weights["em"],
            et: this._entropy(Array.from(gitEvent.decoded.ticket||""))*weights["et"],
            er: this._entropy(Array.from(gitEvent.gitlog||""))*weights["er"],
            ed: this._entropy(Array.from(gitEvent.diff||""))*weights["ed"],
            e: 0,
            w: {
                ec: this._entropy(gitEvent.decoded.commit?gitEvent.decoded.commit.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[])*weights2["ec"],
                em: this._entropy(gitEvent.decoded.message?gitEvent.decoded.message.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[])*weights2["em"],
                et: this._entropy(gitEvent.decoded.ticket?gitEvent.decoded.ticket.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[])*weights2["et"],
                er: this._entropy(gitEvent.gitlog?gitEvent.gitlog.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[])*weights2["er"],
                ed: this._entropy(gitEvent.diff?gitEvent.diff.split(/\W+/gi).map(item=>item.toLowerCase()).map(item=>item.trim()):[])*weights2["ed"],
            }     
        }

        entropy.e = entropy.ec+entropy.em+entropy.et+entropy.er+entropy.ed+ entropy.w.ec+entropy.w.em+entropy.w.et+entropy.w.er+entropy.w.ed;

        return entropy;

    }

    _entropy(arr:any[]){
        const len = arr.length
 
        // Build a frequency map from the string.
        
        const frequencies:any = arr
          .reduce((freq:any, c:any) => {            
            freq[c] = (freq[c] || 0) + 1;             
            return freq;
          }, {})
       
        // Sum the frequency of each character.
        const sum:any = Object.values(frequencies)
          .reduce((sum:any, f:any) => {
            if(isNaN(f)) return sum; // in some strange cases when running in tests sometimes there is a NaN (like "should" or "toString")
            return sum - f/len * Math.log2(f/len)
          }, 0)        
        return parseFloat(sum.toFixed(3));
    }    
}