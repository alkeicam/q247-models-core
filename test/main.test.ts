// import chai, { assert } from 'chai'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'


chai.should();
chai.use(chaiAsPromised);

// const assert = chai.assert;

const expect = chai.expect;

// import sinon, { SinonStub } from 'sinon';


import {ShanonEntropyScoreModelV1, Event} from "../src/q247-models"



import {MOCKS} from "./data.mock"

describe("Models",()=>{
    describe("ShanonEntropyScoreModelV1",()=>{
        it("",async ()=>{
            const model = new ShanonEntropyScoreModelV1();            
            const score = await model.score((<any>MOCKS.hookEvents.one) as Event);
            expect(score.score).gt(0);
        })
    })
})


