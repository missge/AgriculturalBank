function Foo() {
    this.value = 100;
}

Foo.prototype = {
    method:function () {

    }
}
function Bar() {

}

// 设置bar的prototype为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'hello world';

// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;

var test = new Bar();

// 原型链

test [Bar的实例]
    Bar.prototype [Foo的实例]
        {foo:'hello world'}
        Foo.prototype
            {method:...};
            Object.prototype
                {toString: ... /* etc. */};
