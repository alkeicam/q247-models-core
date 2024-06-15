export interface Decoded{
    ticket:string; // id of the ticket
    ticketPrefix:string; //ticket prefix, usually this should map to external project id/code
    commit:string; // - commit line with commit hash
    author:any // author data
    date:string // date line
    message:string // change message
    changes:string // changes lines
    changeSummary:any // summary of changes
}
export interface Event{
    version: string;
    oper: "commit"|"push";
    remote: string;
    account: string;
    user: string;
    project: string;
    id: string;
    decoded: Decoded;
    ct: number;
    tenantId: string;
    gitlog: string;
    diff: string
}