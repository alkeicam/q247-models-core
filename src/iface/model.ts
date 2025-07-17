
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

export interface ScalarScoreWithChangeSummary extends Score{    
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