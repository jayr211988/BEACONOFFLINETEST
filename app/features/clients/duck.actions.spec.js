import { newClient } from './duck.js';
import sinon from 'sinon';
import { expect } from 'chai';
import { resolvedPromise, getMockedClient, rejectedPromise } from '../../util/helpers/test-helper';
import { describe, before, it } from 'mocha';

describe('CLIENTS - Actions', () => {
    
    describe('.newClient()', () => {

        let clientBeacon,
            dispatch,
            resetFields;
        
        before(() => {
            clientBeacon = getMockedClient();
            dispatch = sinon.spy();
            resetFields = sinon.spy();
        }); 

        it('should able to call api', () => {
            // Arrange
            const clientDto = {
                name: 'Client A'
            };
            clientBeacon.post = sinon.stub().returns(resolvedPromise(null));


            // Act
            newClient(clientDto, resetFields)(dispatch, {}, {clientBeacon});


            // Assert
            expect(clientBeacon.post.args[0][0]).to.equal('/api/Client/NewClient');
        });

        describe('.then()', () => {
            it('should call reset fields and success dispatch', () => {
                // Arrange
                const clientDto = {
                    name: 'Client A'
                };
                clientBeacon.post = sinon.stub().returns(resolvedPromise(null));


                // Act
                newClient(clientDto, resetFields)(dispatch, {}, {clientBeacon});


                // Assert
                return Promise.resolve().then(() => {
                    expect(dispatch.calledWith({
                        type: 'CLIENTS_NEW_CLIENT_SUCCESS'
                    })).to.be.true;

                    expect(resetFields.calledWith()).to.be.true;
                });
            });
        });

        describe('.catch()', () => {
            it('should call error dispatch', () => {
                // Arrange
                const clientDto = {
                    name: 'Client A'
                };
                const error = new Error('');
                clientBeacon.post = sinon.stub().returns(rejectedPromise(error));


                // Act
                newClient(clientDto, resetFields)(dispatch, {}, {clientBeacon});


                // Assert
                return Promise.reject(error).catch(() => {
                    expect(dispatch.calledWith({
                        type: 'CLIENTS_NEW_CLIENT_ERROR'
                    })).to.be.true;
                });
            });
        });


    });

});