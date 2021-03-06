
var _ = require('../')
_.run(function () {

    function testing(name) {
        _.print('# testing: ' + name)
    }

    function verify(x, name) {
        if (x) {
            _.print('ok test passed')
        } else {
            _.print('not ok test FAILED' + (name ? ': ' + name : ''))
            throw new Error("failure")
        }
    }

    testing('_.identity')
    verify(_.identity(5) == 5)

    testing('_.has')
    Object.prototype.hi = "ho"
    var o = { foo : false }
    verify(o.hi && !_.has(o, 'hi') && _.has(o, 'foo'))
    delete Object.prototype.hi

    testing('_.each')
    var s = ""
    _.each({ a : 1, b : 4, c : 9 }, function (v, k) {
        s += v + k
    })
    _.each([1, 4, 9], function (v, k) {
        s += '' + v + k
    })
    _.each([1, 4, 9], function (v, k) {
        s += '' + v + k
        if (v == 4) return false
    })
    _.each({ a : 1, b : 4, c : 9 }, function (v, k) {
        s += v + k
        if (v == 4) return false
    })
    verify(s == "1a4b9c10419210411a4b")

    testing('_.size')
    var a = []
    a[1] = 'hi'
    verify(_.size(a) == 2)
    verify(_.size({a:1, b:2, c:3}) == 3)

    testing('_.deepEquals')
    var a = [3, 4, { 'hi' : 'ho', 'a' : 'b' }]
    var b = [3, 4, { 'a' : 'b', 'hi' : 'ho' }]
    var c = [3, 4, { 'hi' : 'NO', 'a' : 'b' }]
    verify(_.deepEquals(a, b) && !_.deepEquals(a, c))

    testing('_.any')
    verify(_.any([1, 2, 3, 4], function (a) { return a == 4 }))
    verify(!_.any([1, 2, 3, 4], function (a) { return a == 5 }))
    verify(_.any({a:1, b:2, c:3, d:4}, function (a) { return a == 4 }))
    verify(!_.some({a:1, b:2, c:3, d:4}, function (a) { return a == 5 }))

    testing('_.all')
    verify(_.all([1, 2, 3, 4], function (a) { return a < 5 }))
    verify(!_.all([1, 2, 3, 4], function (a) { return a < 4 }))
    verify(_.all({a:1, b:2, c:3, d:4}, function (a) { return a < 5 }))
    verify(!_.every({a:1, b:2, c:3, d:4}, function (a) { return a < 4 }))

    testing('_.map')
    verify(_.deepEquals(_.map([1, 4, 9], function (e) { return Math.sqrt(e) }), [1, 2, 3]))
    verify(_.deepEquals(_.map({a:1, b:4, c:9}, function (v, k) { return k + Math.sqrt(v) }), {a:'a1',b:'b2',c:'c3'}))
    verify(_.deepEquals(_.map(new Array(3), function (e, i) { return i + 1 }), [1, 2, 3]))

    testing('_.filter')
    verify(_.deepEquals(_.filter([1, 4, 9], function (e) { return e % 2 != 0 }), [1, 9]))
    verify(_.deepEquals(_.filter({a:1, b:4, c:9}, function (v, k) { return v % 2 != 0 }), {a:1, c:9}))
    verify(_.deepEquals(_.filter(new Array(3), function (e, i) { return i < 2 }), [undefined, undefined]))

    testing('_.fold')
    verify(_.deepEquals(_.fold([1, 4, 9], function (a, b) { return a * b }, 2), 2 * 1 * 4 * 9))
    verify(_.deepEquals(_.reduce({a:1, b:4, c:9}, function (a, b) { return a + b }, 6), 20))
    testing('_.fold again')
    verify(_.deepEquals(_.fold([1, 4, 9], function (a, b) { return a * b }), 1 * 4 * 9))
    verify(_.deepEquals(_.reduce({a:1, b:4, c:9}, function (a, b) { return a + b }), 14))

    testing('_.rename')
    verify(_.deepEquals(_.rename({a:1,b:2,c:3},{a:'aa',d :'dd'}),{aa:1,b:2,c:3}));
    verify(_.deepEquals(_.rename({a:1,b:2,c:3},{a:'aa',aa :'bb'}),{aa:1,b:2,c:3}));
    verify(
      _.deepEquals(_.rename({a:1,b:2,c:3},{a:'b'}) ,{b:1,c:3}) ||
      _.deepEquals(_.rename({a:1,b:2,c:3},{a:'b'}) ,{b:2,c:3})
    );
    verify(
      _.deepEquals(_.rename({a:1,b:2,c:3},{a:'z',b:'z'}) ,{z:1,c:3}) ||
      _.deepEquals(_.rename({a:1,b:2,c:3},{a:'z',b:'z'}) ,{z:2,c:3})
    );


    testing('_.min')
    verify(_.min([4, 2, 8], function (e) { return -e }) == 8)
    verify(_.min([4, 2, 8]) == 2)
    verify(_.min(['10', '2', '11'], function (e) { return 1 * e }) === '2')

    testing('_.max')
    verify(_.max([4, 2, 16, 8], function (e) { return -e }) == 2)
    verify(_.max([4, 2, 16, 8]) == 16)
    verify(_.max(['1', '2', '11'], function (e) { return 1 * e }) === '11')

    testing('_.find')
    verify(_.find([4, 2, 16, 8], function (e) { return e / 4 == 4 }) == 16)
    verify(_.find({a:false, b:5, c:false}) == 5)

    testing('_.range')
    verify(_.deepEquals(_.range(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
    verify(_.deepEquals(_.range(1, 11), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    verify(_.deepEquals(_.range(0, 30, 5), [0, 5, 10, 15, 20, 25]))

    testing('_.keys')
    verify(_.deepEquals(_.keys([1, 4, 9]), ['0', '1', '2']))
    verify(_.deepEquals(_.keys({a:1, b:4, c:9}), ['a', 'b', 'c']))

    testing('_.values')
    verify(_.deepEquals(_.values([1, 4, 9]), [1, 4, 9]))
    verify(_.deepEquals(_.values({a:1, b:4, c:9}), [1, 4, 9]))

    testing('_.extend')
    verify(_.deepEquals(_.extend({a:1}, {b:4, c:9}), {a:1, b:4, c:9}))
    verify(_.deepEquals(_.merge({a:1, b:4}, {c:9}), {a:1, b:4, c:9}))

    testing('_.clone')
    var a = {a:1, b:4, c:9}
    var b = _.clone(a)
    verify(a != b && _.deepEquals(a, b))
    var a = [1, 4, 9]
    var b = _.clone(a)
    verify(a != b && _.deepEquals(a, b))

    testing('_.cloneClone')
    var a = {a : {b : 5, c : [1, 2]}}
    var b = _.deepClone(a)
    verify(_.deepEquals(a, b))
    a.a.b = 6
    a.a.c[1] = 3
    verify(_.deepEquals(a, {a : {b : 6, c : [1, 3]}}))
    verify(_.deepEquals(b, {a : {b : 5, c : [1, 2]}}))

    testing('_.pairs')
    verify(_.deepEquals(_.pairs([1, 4, 9]), [[0, 1], [1, 4], [2, 9]]))
    verify(_.deepEquals(_.pairs({a:1, b:4, c:9}), [['a', 1], ['b', 4], ['c', 9]]))
    verify(!_.deepEquals(_.pairs({a:1, b:4, c:9}), [['a', 1], ['b', 4], ['NO', 9]]))

    testing('_.unPairs')
    verify(_.deepEquals(_.object([['0', 1], ['1', 4], ['2', 9]]), {'0':1, '1':4, '2':9}))
    verify(_.deepEquals(_.unPairs([['a', 1], ['b', 4], ['c', 9]]), {a:1, b:4, c:9}))
    verify(_.deepEquals(_.unPairs(['0', '1', '2'], [1, 4, 9]), {'0':1, '1':4, '2':9}))
    verify(_.deepEquals(_.object(['a', 'b', 'c'], [1, 4, 9]), {a:1, b:4, c:9}))
    var x = [["a", 5], ["b", 6]]
    var y = _.unPairs(x)
    verify(y.a == 5 && y.b == 6)

    testing('_.pick')
    verify(_.deepEquals(_.pick({a:1, b:4, c:9}, 'c', 'b'), {c:9,b:4}))
    verify(_.deepEquals(_.pick({a:1, b:4, c:9}, 'c', 'b', 'toString'), {c:9,b:4}))

    testing('_.omit')
    verify(_.deepEquals(_.omit({a:1, b:4, c:9}, 'b'), {a:1,c:9}))

    testing('_.setAdd')
    var s = {a:false}
    verify(_.setAdd(s, 'a') === true)
    verify(_.deepEquals(s, {a:true}))
    verify(_.setAdd(s, 'a') === false)
    var s = {}
    verify(_.setAdd(s, 'a') === true)
    verify(_.deepEquals(s, {a:true}))

    testing('_.makeSet')
    verify(_.deepEquals(_.makeSet(['a', 'b']), {a:true, b:true}))
    verify(_.deepEquals(_.makeSet({'a':'b','c':'d'}), {b:true,d:true}))

    testing('_.inSet')
    verify(_.inSet({a:true,b:false}, 'b') == false)
    verify(_.inSet({a:true}, 'b') == false)
    verify(_.inSet({a:true}, 'a') == true)

    testing('_.setSub')
    verify(_.deepEquals(_.setSub({a:true,b:false,c:true}, {a:false,c:true,d:true}), {a:true,b:false}))

    testing('_.bagAdd')
    var b = {}
    _.bagAdd(b, 'a')
    _.bagAdd(b, 'b')
    _.bagAdd(b, 'a', 2)
    verify(_.deepEquals(b, {b:1,a:3}))
    _.bagAdd(b, 'b', -1)
    verify(_.deepEquals(b, {b:0,a:3}))

    testing('_.listAdd')
    verify(_.deepEquals(_.listAdd(['a','b'],'c'),['a','b','c']));
    verify(_.deepEquals(_.listAdd(['b','a'],'c'),['b','a','c']));
    verify(_.deepEquals(_.listAdd(['c','b'],'a'),['c','b','a']));
    verify(_.deepEquals(_.listAdd(['c','b'],'b'),['c','b']));

    testing('_.lerp')
    verify(_.lerp(0, 0, 1, 1, .5) == .5)

    testing('_.lerpCap')
    verify(_.lerpCap(0, 0, 1, 1, -1) == 0)
    verify(_.lerpCap(0, 0, 1, 1, 2) == 1)
    verify(_.lerpCap(0, 1, 1, 0, -1) == 1)
    verify(_.lerpCap(0, 1, 1, 0, 2) == 0)

    testing('_.time')
    verify(Math.abs(_.time() - (new Date().getTime())) < 10)

    testing('_.trim')
    verify(_.trim(' hi  \n') == 'hi')

    testing('_.lines')
    verify(_.deepEquals(_.lines('a\nb'), ['a', 'b']))

    testing('_.sum')
    verify(_.sum([1, 4, 9]) == 14)
    verify(_.sum({a:1, b:4, c:9}) == 14)

    testing('_.sample')
    verify(_.sample([2, 4, 8]) % 2 == 0)
    verify(_.sample({a:1, b:3, c:7}) % 2 == 1)

    testing('_.shuffle')
    var a = [1, 2, 3, 4, 5]
    var count = 0
    for (var i = 0; i < 100; i++) {
        _.shuffle(a)
        if (a[0] == 3) count++
    }
    verify(count > 2 && count < 98)

    testing('_.randomInt')
    verify(_.all(_.map(new Array(100), function () { return _.randomInt(10) }), function (x) { return x >= 0 && x < 10 }))
    verify(_.all(_.map(new Array(100), function () { return _.randomInt(-20, -10) }), function (x) { return x >= -20 && x < -10 }))

    testing('_.randomString')
    var x = _.randomString(5, /a/)
    verify(x == 'aaaaa')
    var x = _.randomString(20, /[a-qP-Z2-9]/)
    verify(x.match(/^[a-qP-Z2-9]{20}$/))

    testing('_.sort / _.sortBy')
    var x = [{a:4}, {a:6}, {a:2}, {a:3}, {a:1}, {a:9}]
    verify(_.deepEquals(_.sort(x, function (e) { return e.a }), [{a:1}, {a:2}, {a:3}, {a:4}, {a:6}, {a:9}]))
    verify(_.deepEquals(_.sortDesc(x, function (e) { return e.a }), [{a:9}, {a:6}, {a:4}, {a:3}, {a:2}, {a:1}]))

    testing('_.toArray')
    function func() {
        verify(_.deepEquals(_.toArray(arguments), [1, 2, 3]))
    }
    func(1, 2, 3)

    testing('_.ensure')
    var a = {}
    verify(_.ensure(a, 'b', 1, 'c', 5), 5)
    verify(_.ensure(a, 'b', 0, 'd', 2), 2)
    verify(_.deepEquals(a, {b:[{d:2},{c:5}]}))
    var x = {}
    _.ensure(x, "a", "b", 0, "c", 1)
    verify(x.a.b[0].c == 1)

    testing('escape and unescape functions')
    verify(_.escapeUnicodeChar('\u0345') == '\\u0345')
    verify(_.escapeString('"hello"') == '\\"hello\\"')
    verify(_.escapeRegExp('.') == '\\.')
    verify(_.escapeUrl(' ') == '%20')
    verify(_.unescapeUrl('%20') == ' ')
    verify(_.escapeXml('<') == '&lt;')
    verify(_.unescapeXml('&lt;') == '<')

    testing('_.getUrlParams')
    verify(_.deepEquals(_.getUrlParams('http://example.com/hello?hi=yo&ho=yum%20yum'), { hi : 'yo', ho : 'yum yum' }))

    testing('_.json, _.unJson, _.decycle and _.recycle')
    var a = {}
    a.b = a
    verify(_.json(a).match(/cycle_root/))
    verify(!_.json(a).match(/\n/))
    verify(_.json(a, true).match(/\n/))
    var x = _.unJson(_.json(a))
    verify(x.b == x)

    // node.js functions...

    testing('_.read and _.write')
    var test_file_contents = 'some text'
    _.write('./_test_file.txt', test_file_contents)
    var s = _.read('./_test_file.txt')
    verify(s == test_file_contents)

//    testing('_.print')
//    _.print('# hopefully this is visible')
//    _.print('# here is an object:', { a : 'hi', b : 'ho' })

    testing('_.md5')
    verify(_.md5('blah') == '6f1ed002ab5595859014ebf0951522d9')

    testing('_.run and _.yield and _.p')
    var i = 0
    var set = _.p()
    var f = null
    verify(_.run(function () {
        f = require('fibers').current
        verify(0 == i++)
        verify(_.yield('foo') == 'bar')
        verify(2 == i++)
        set(33)
    }) == 'foo')
    verify(1 == i++)
    _.run(f, 'bar')
    verify(3 == i++)
    verify(_.p() == 33)

    testing('_.parallel')
    var i = 0
    _.parallel([
        function () {
            _.p(setTimeout(_.p(), 100))
            i++
        },
        function () {
            _.p(setTimeout(_.p(), 200))
            i++
        }
    ])
    verify(i == 2)

    testing('_.consume and _.wget')
    var s = _.wget('http://dglittle.github.io/gl519/tests.js')
    verify(s.match(/_\.consume and _\.wget/))
    verify(_.wget.res.statusCode == 200)
    verify(_.wget.res.headers.server == 'GitHub.com')

    var res = _.p(require('http').request({
        method : 'GET',
        hostname : 'dglittle.github.io',
        path : '/gl519/tests.js'
    }, _.p()).end())
    var buf = _.consume(res, 'buffer')
    verify(buf instanceof Buffer)
    verify(('' + buf).match(/_\.consume and _\.wget/))

    // md5.js

    testing('md5.js')
    require('./md5.js')
    verify(md5('blah') == '6f1ed002ab5595859014ebf0951522d9')

    // aes.js

    testing('aes.js')
    require('./aes.js')
    var a = aes_encrypt('hello', 'pass')
    var b = aes_decrypt(a, 'pass')
    var c = aes_decrypt(a, 'wrong_pass')
    verify(a != 'hello')
    verify(b == 'hello')
    verify(c != 'hello')

    // random.js

    testing('random.js')
    var a = Math.random()
    require('./random.js')
    Math.randomSeed(5)
    var x = Math.random()
    Math.randomSeed(6)
    var b = Math.random()
    Math.randomSeed(5)
    var y = Math.random()
    verify(x == y)
    verify(a != x)
    verify(b != x)

    Math.randomSeed('hello')
    var x = Math.random()
    Math.randomSeed('hi?')
    var b = Math.random()
    Math.randomSeed('hello')
    var y = Math.random()
    verify(x == y)
    verify(b != x)

    // math.js

    testing('math.js')
    require('./math.js')
    verify(Math.abs(normal(0, 1, 4) - 0.00013383) < 0.000001)
    verify(Math.abs(normal(3, 2, 4) - 0.176033) < 0.000001)

    //

    testing('_.exit')
    //_.exit()
    //_.print("#hopefully we don't see this")

})
