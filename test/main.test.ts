// import chai, { assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'


chai.should();
chai.use(chaiAsPromised);

// const assert = chai.assert;

const expect = chai.expect;

// import sinon, { SinonStub } from 'sinon';


import {ShanonEntropyScoreModelV1, ShanonEntropyScoreModelV2, Event} from "../src/q247-models"



import {MOCKS} from "./data.mock"

describe("Models",()=>{
    describe("ShanonEntropyScoreModelV1",()=>{
        it("",async ()=>{
            const model = new ShanonEntropyScoreModelV1();            
            const score = await model.score((<any>MOCKS.hookEvents.one) as Event);
            const score2 = await model.score((<any>MOCKS.hookEvents.two_many_files) as Event);
            expect(score.score).closeTo(1,0.1);
            expect(score2.score).closeTo(130,1);
        })
    }),
    describe("ShanonEntropyScoreModelV2",()=>{
        it("",async ()=>{
            const model = new ShanonEntropyScoreModelV2();            
            const score = await model.score((<any>MOCKS.hookEvents.one) as Event);
            const score2 = await model.score((<any>MOCKS.hookEvents.two_many_files) as Event);
            expect(score.score).closeTo(1,0.1);
            expect(score2.score).closeTo(130,1);
        })
    })
})


