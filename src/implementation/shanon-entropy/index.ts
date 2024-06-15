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

        // 1/10 of the entropy score extra can be gained by number of lines
        

        // you get 100 points for each push
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
                ec: this._entropy(gitEvent.decoded.commit?gitEvent.decoded.commit.split(/\W+/gi):[]),
                em: this._entropy(gitEvent.decoded.message?gitEvent.decoded.message.split(/\W+/gi):[]),
                et: this._entropy(gitEvent.decoded.ticket?gitEvent.decoded.ticket.split(/\W+/gi):[]),
                er: this._entropy(gitEvent.gitlog?gitEvent.gitlog.split(/\W+/gi):[]),
                ed: this._entropy(gitEvent.diff?gitEvent.diff.split(/\W+/gi):[]),
            }     
        }

        entropy.e = entropy.ec+entropy.em+entropy.et+entropy.er+entropy.ed;

        return entropy;

    }

    // _entropy(str:any){
    //     const len = str.length
 
    //     // Build a frequency map from the string.
    //     const frequencies:any = Array.from(str)
    //       .reduce((freq:any, c:any) => (freq[c] = (freq[c] || 0) + 1) && freq, {})
       
    //     // Sum the frequency of each character.
    //     const sum:any = Object.values(frequencies)
    //       .reduce((sum:any, f:any) => sum - f/len * Math.log2(f/len), 0)        
    //     return parseFloat(sum.toFixed(3));
    // }

    _entropy(arr:any[]){
        const len = arr.length
 
        // Build a frequency map from the string.
        const frequencies:any = arr
          .reduce((freq:any, c:any) => (freq[c] = (freq[c] || 0) + 1) && freq, {})
       
        // Sum the frequency of each character.
        const sum:any = Object.values(frequencies)
          .reduce((sum:any, f:any) => sum - f/len * Math.log2(f/len), 0)        
        return parseFloat(sum.toFixed(3));
    }
    // _entropyWords(str:any){
    //     const words = str.split("\\W+");
    //     const len = words.length
 
    //     // Build a frequency map from the string.
    //     const frequencies:any = words
    //       .reduce((freq:any, c:any) => (freq[c] = (freq[c] || 0) + 1) && freq, {})
       
    //     // Sum the frequency of each word.
    //     const sum:any = Object.values(frequencies)
    //       .reduce((sum:any, f:any) => sum - f/len * Math.log2(f/len), 0)        
    //     return parseFloat(sum.toFixed(3));
    // }
    
    
}