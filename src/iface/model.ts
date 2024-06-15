
import {Event} from "./event";

export interface Score {
    id: string; // score unique id
    model: ScoreModelCard;
    event: Event; // source event that was scored
}

export interface ScalarScore extends Score{    
    score: number
}

export interface ScoreModelCard {
    name: string;
    version: string;
}

export interface ScoreModel extends ScoreModelCard{           
    score: (event:Event) => Promise<Score>;
}