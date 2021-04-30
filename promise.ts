interface ResolveFn<T> {
  (arg: T): void;
}

interface RejectedFn<T> {
  (arg: T): void;
}

interface JPromiseParamFn<T> {
  (resove: ResolveFn<T>, reject: RejectedFn<T>): void;
}

interface JPromiseInstance<T> {}

interface JPromiseContructor<T> {
  new (fn: JPromiseParamFn<T>): JPromiseInstance<T>;

  PENDING: string;

  FULLFILLED: string;

  REJECTED: string;
}

class JPromise<T> {
  static PENDING: string = 'pending';

  static FULLFILLED: string = 'fullfilled';

  static REJECTED: string = 'rejected';

  private value!: T;

  private status: string = JPromise.PENDING;

  private resolveCallbacks: any[] = [];

  private rejectCallbacks: any[] = [];

  constructor (fn: JPromiseParamFn<T>) {
    const reoslve: ResolveFn<T> = (value: T) => {
      if (this.status === JPromise.PENDING) {
        this.value = value;
        this.status = JPromise.FULLFILLED;
        this.resolveCallbacks.map((cb: ResolveFn<T>) => cb(value));
      }
    }

    const reject: RejectedFn<T> = (value: any) => {
      if (this.status === JPromise.PENDING) {
        this.value = value;
        this.status = JPromise.REJECTED;
        this.rejectCallbacks.map((cb: RejectedFn<T>) => cb(value));
      }
    }

    try {
      fn(reoslve, reject);
    } catch (e) {
      reject(e)
    }
  }

  then (...thenFns: ResolveFn<T>[]) {
    thenFns.forEach((fn: ResolveFn<T>, index: number) => {
      if (index == thenFns.length - 1) {
        fn = typeof fn === 'function' ? fn : (v: T) => v;
        this.rejectCallbacks.push(fn);
      } else {
        fn = typeof fn === 'function' ? fn : (r: T) => r;
        this.resolveCallbacks.push(fn);
      }
    });

    return this;
  }

  catch (catchFn: RejectedFn<T>) {
    this.rejectCallbacks = [catchFn];
  }
  
}

const jpromise = new JPromise((resolve: ResolveFn<string>, reject: RejectedFn<string>) => {
    const random = Math.random();

    if (random > 0.5) {
      resolve('成功');
    } else {
      reject('失败');
    }
})

jpromise.then((res: string) => {
  console.log(res);
}).catch((e: string) => {
  console.log(e);
});