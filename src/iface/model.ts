
import {Event} from "./event";
import {Content}  from "./content";

export interface Score {
    id: string; // score unique id
    model: ScoreModelCard;
    event: Event|Content.ContentEvent; // source event that was scored
}

export interface ScalarScore extends Score{    
    score: number
}

export interface ScalarScoreWithChangeSummary extends ScalarScore{    
    files: number,
    inserts: number,
    deletions: number
}

export interface ScoreModelCard {
    name: string;
    version: string;
}

export interface ModelParams {
    [key: string]: any; // Keys are strings
}

export interface ScoreModel extends ScoreModelCard{        
    score: (event:Event) => Promise<Score>;
}

export interface ContentScoreModel extends ScoreModelCard{        
    score: (event:Content.ContentEvent) => Promise<ScalarScoreWithChangeSummary>;
}

export namespace Diff {
    export interface GitDiffLineChange {
        type: 'added' | 'removed';
        line: string;
      }
      
      export interface GitDiffFile {
        original: string;   // Content before the change
        resulting: string;  // Content after the change
        changed: GitDiffLineChange[]; // List of line-level changes
      }
      
      export interface GitDiffResult {
        [filePath: string]: GitDiffFile;
      }
}
export namespace Halstead {
    export interface FileMetrics {
        [filePath: string]: Metrics
    }
    export interface IncrementMetrics {
        files: FileMetrics[],
        total: Metrics
    }    
    export interface Metrics {
        scaledEffort: number, 
        vocabulary: number, 
        length: number, 
        volume: number, 
        difficulty: number, 
        effort: number, 
        timeToProgram: number, 
        deliveredBugs: number
    }

    export interface Score extends ScalarScore{
        increment: IncrementMetrics
    }
}