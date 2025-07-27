/* istanbul ignore file */
export type {ScalarScore, Score, ScoreModel, ScoreModelCard, ContentScoreModel, ScalarScoreWithChangeSummary, ModelParams, HalsteadScore} from "./iface/model"
export type {Event, Decoded, Author, ChangeSummary, DecodedBase, EventBase} from "./iface/event"
export {Diff} from "./iface/model"
export type {Content} from "./iface/content"

export {parseGitDiff} from "./logic/commons"