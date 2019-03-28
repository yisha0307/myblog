const path = require('path')
const assert = require('assert')
const request = require('supertest')
const app = require('../index')
const User = require('../lib/mongodb').User

const testName1 = 'testName1'
const testName2 = 'nswbmw'

describe('signup', function () {
    describe('POST /signup', function () {
        const agent = request.agent(app)  // persist cookie when redirect
        beforeEach(function (done) {
            // create a new user
            User.create({
                name: testName1,
                password: '123456',
                avatar: '',
                gender: 'x',
                bio: ''
            })
            .exec()
            .then(function () {
                done()
            })
            .catch(done)
        })
    })

    afterEach(function (done) {
        User.deleteMany({name: {$in: [testName1, testName2]}})
            .exec()
            .then(function () {
                done()
            })
            .catch(done)
    })

    after(function(done){
        process.exit()
    })

    // 用户名错误的情况
    it('wrong name', function(done){
        agent
            .post('/signup')
            .type('form')
            .field({name: ''})
            .attach('avatar', path.join(__dirname, 'avatar.png'))
            .redirects()
            .end(function(err,res){
                if(err) return done(err)
                assert(res.text.match(/名字请限制在 1-10 个字符/))
                done()
            })
    })
    // 注册成功
    it('success', function(done){
        agent
            .post('/signup')
            .type('form')
            .field({name: testName2, gender: 'm', bio: 'noder', password: '123456', repassword: '12345600'})
            .attach('avatar', path.join(__dirname, 'avatar.png'))
            .redirects()
            .end(function(err,res){
                if (err) return done(err)
                assert(res.text.match(/注册成功/))
                done()
            })
    })
})
