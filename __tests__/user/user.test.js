import request from 'supertest';
import 'regenerator-runtime/runtime';
import randomstring from 'randomstring';
import application from '../../lib/app';

describe('test /users path', () => {
    let app;
    let token;
    let user;
    let newUser;

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

    test('get suggestion', async done => {
        request(app)
            .get('/api/v1.0/users?loginSubstring=j&limit=10')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                const data = response.body;
                expect(data.length).toBeGreaterThan(0);
                user = data[0];
                done();
            });
    });

    test('get user', async done => {
        request(app)
            .get(`/api/v1.0/users/${user.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                const data = response.body;
                expect(data).toMatchObject(user);
                done();
            });
    });

    test('create user', async done => {
        const login = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
        });
        const userToCreate = {
            login,
            password: 'P@ssw0rd',
            age: 30
        };
        request(app)
            .post('/api/v1.0/users')
            .set('Authorization', `Bearer ${token}`)
            .send(userToCreate)
            .then(response => {
                expect(response.statusCode).toBe(200);
                newUser = response.body;
                expect(newUser.login).toEqual(userToCreate.login);
                expect(newUser.age).toEqual(userToCreate.age);
                expect(newUser.isDeleted).toBeFalsy();
                done();
            });
    });

    test('update user', async done => {
        // eslint-disable-next-line no-unused-vars
        const { ['id']: _, ...withoutId } = newUser;
        request(app)
            .put(`/api/v1.0/users/${newUser.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                ...withoutId,
                isDeleted: true
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                const updated = response.body;
                expect(updated.login).toEqual(newUser.login);
                expect(updated.age).toEqual(newUser.age);
                expect(updated.password).toEqual(newUser.password);
                expect(updated.isDeleted).toBeTruthy();
                done();
            });
    });

    test('delete user', async done => {
        request(app)
            .delete(`/api/v1.0/users/${newUser.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(204);
                done();
            });
    });
});
