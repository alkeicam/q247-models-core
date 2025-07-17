export interface Author {
    name: string;
    email: string;
}
export interface ChangeSummary {
    raw: string; // usually something like " 2 files changed, 136 insertions(+), 1 deletion(-)",
    files: number,
    inserts: number,
    deletions: number
}

export interface DecodedBase{
    author:Author // author data
    ticket:string; // id of the ticket
    ticketPrefix:string; //ticket prefix, usually this should map to external project id/code
    changeSummary:ChangeSummary // summary of changes
}

export interface Decoded extends DecodedBase{
    commit:string; // - commit line with commit hash
    commitId: string; // just commit id withot "commit" prefix    
    date:string // date line for git log command, usually: Date:   2025-05-28 21:45:31
    message:string // change message
    changes:string|string[] // changes lines    
}

/**
 * Base increment event structure. There might be multiple increments (like code increment 
 * aka commit, or some content increments like working on JIRA issue)
 */
export interface EventBase{
    id: string;
    version: string;
    oper: string;    
    account: string;
    user: string;  
    project: string;      
    decoded: DecodedBase;
    ct: number;
    tenantId: string;    
}

/**
 * Represents a "commit" event
 */
export interface Event extends EventBase{ 
    remote: string;   
    oper: "commit"|"push";
    decoded: Decoded;        
    gitlog: string;
    diff: string;
}