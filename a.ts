class a {
  b: string
  c: number
  d(y: string): string {
    return y
  }
}

class b {
  constructor(private g: a) {

  }

  bb() {
    console.log(this.g.b);
  }

  // cc() {
  //   this.g.d(3040)
  // }
}


const jj = {
  b: "fdfs"
}

console.log(jj.b);

interface aaa {
  g(): void 
}
