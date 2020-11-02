import request from 'supertest';
import 'regenerator-runtime/runtime';
import randomstring from 'randomstring';
import { isEqual } from 'lodash';
import application from '../../lib/app';

describe('test /groups path', () => {
    let app;
    let token;
    let createdGroup;

    beforeAll(async (done) => {
        app = await application();
        request(app)
            .post('/api/v1.0/auth/signin')
            .send({
                login: 'john_doe',
                password: 'P@ssw0rd'
            })
            .end((_, responce) => {
                token = responce.body.token.accessToken;
                done();
            });
    });

    test('get groups', async done => {
        request(app)
            .get('/api/v1.0/groups')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                const data = response.body;
                expect(data.length).toBeGreaterThan(0);
                done();
            });
    });

    test('create group', async done => {
        const groupName = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
        });
        const newGroup = {
            name: groupName,
            permissions: [
                'READ'
            ]
        };
        request(app)
            .post('/api/v1.0/groups')
            .set('Authorization', `Bearer ${token}`)
            .send(newGroup)
            .then(response => {
                expect(response.statusCode).toBe(200);
                createdGroup = response.body;
                expect(createdGroup.name).toEqual(newGroup.name);
                expect(isEqual(newGroup.permissions, createdGroup.permissions)).toBeTruthy();
                done();
            });
    });

    test('update group', async done => {
        const groupName = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
        });
        const updatedGroup = {
            name: groupName,
            permissions: [
                'READ', 'WRITE'
            ]
        };
        request(app)
            .put(`/api/v1.0/groups/${createdGroup.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedGroup)
            .then(response => {
                expect(response.statusCode).toBe(200);
                const update = response.body;
                expect(update.name).toEqual(updatedGroup.name);
                expect(isEqual(update.permissions, updatedGroup.permissions)).toBeTruthy();
                done();
            });
    });

    test('delete group', async done => {
        request(app)
            .delete(`/api/v1.0/groups/${createdGroup.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(204);
                done();
            });
    });
});
