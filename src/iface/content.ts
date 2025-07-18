import { DecodedBase, EventBase } from "./event";

export namespace Content {
    export enum ContentEventOperEnum {
        JIRA_TICKET = "jira-ticket",
        CONFLU_PAGE = "conflu-page"
    }
    /**
     * Represents an increment/change in content.
     * Usually either we have before and after content or diff content.
     * If we have diff content, then before and after are not required.
     * If we have before and after content, then diff content is not required.
     */
    export interface ContentDiff{
        fieldId?: string; // field id
        before?: string; // before content
        after?: string; // after content
        diff?: string; // diff content
    } 

    export interface ContentJiraTicketEvent extends ContentEvent {
        oper: ContentEventOperEnum.JIRA_TICKET;        
    }

    export interface ContentConfluencPageEvent extends ContentEvent {
        oper: ContentEventOperEnum.CONFLU_PAGE;        
    }

    export interface DecodedContent extends DecodedBase {                
        url?: string, // content url        
        projectId?: string // id of the project in which content was modified
        reason?: "issue"|"comment"|"page" // more precise source of calories
    }

    /**
     * Represents an event related to content, such as creating new content or updating existing content.
     * This is a more generic event that can be used for various content-related operations.
     */
    export interface ContentEvent extends EventBase{        
        decoded: DecodedContent;                                
        diff: ContentDiff[]        
    }
}