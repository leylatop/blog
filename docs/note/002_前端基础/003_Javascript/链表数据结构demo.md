```typescript
class LinkedNode<T> {
    value: T;
    next: LinkedNode<T>
    constructor(value: T) {
        this.value = value
    }
}

interface ILinkedList<T> {
    append(value: T): void
    traverse(): void
    insert(value: T, position: number): boolean
    removeAt(position: number): T | null
    get(position: number): T | null
    update(value: T, position: number): boolean
    indexOf(value: T): number
    remove(value: T): T | null
    isEmpty(): boolean
    size(): number
}

class LinkedList<T> implements ILinkedList<T> {
    protected head: LinkedNode<T> | null = null; // 第一个节点
    protected tail: LinkedNode<T> | null = null // 最后一个节点
    protected length: number = 0

    /* 获取指定位置的前一个节点和当前节点 */
    protected getNode(position: number): {
        previous: LinkedNode<T> | null
        current: LinkedNode<T> | null
    } {
        let index = 0
        let previous: LinkedNode<T> | null = null
        let current = this.head

        while(index++ < position && current) {
            previous = current
            current = current.next
        }

        return {
            previous,
            current
        }
    }

    private isTail(node: LinkedNode<T>) {
        return this.tail === node
    }


    /* 向链表尾部追加数据 */
    append(value: T) : void {
        const newNode = new LinkedNode(value)
        if(!this.head) { // 链表为空，则将newNode置为第一个节点
            this.head = newNode
        } else { // 链表不为空，找到尾部节点，让其next指向新节点
            // 这种方法是通过循环找到尾部节点，让尾部节点的next指向新节点
            // let current = this.head
            // while(current.next) {
            //     current = current.next
            // }
            // current.next = newNode
            this.tail!.next = newNode
        }
        this.tail = newNode
        this.length ++
    }

    /* 链表的遍历方法 */
    traverse(): void {
        let values: T[] = []
        let current = this.head
        while(current) {
            values.push(current.value)
            current = this.isTail(current) ? null : current.next // 考虑循环链表的情况
        }

        // 循环链表，将head的value添加到列表的最末端
        if(this.head && this.tail!.next === this.head) {
            values.push(this.head.value)
        }

        console.log(this.length, values.join(" -> "))
    }

    /* 向列表的特定位置插入一个新的项 */
    insert(value: T, position: number): boolean {
        // 1.越界的判断
    if (position < 0 && position > this.length) return false;

    // 2.根据value创建新的节点
    const newNode = new LinkedNode(value);
    let { previous, current } = this.getNode(position);

    // 头部插入
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // 中尾部插入
      newNode.next = current;
      previous!.next = newNode;

      if (position === this.length) {
        // 尾部插入tail为新节点
        this.tail = newNode;
      }
    }
    this.length++;
    return true;
    }


    removeAt(position: number): T | null {
        if(position < 0 && position > this.length) return null

        let { previous, current } = this.getNode(position);

        if(position === 0) {
            this.head = current.next ?? null

            if(this.length === 1) {
                this.tail = null
            }
        } else {
            previous!.next = current.next ?? null
            if(current === this.tail) {
                this.tail = previous
            }
        }
        this.length--
        return current?.value ?? null

    }

    get(position: number): T | null {
        if(position < 0 || position > this.length) return null
        let { current } = this.getNode(position)
        return current?.value ?? null
    }
    update(value: T, position: number): boolean {
        if(position < 0 || position > this.length) return false
        let {current} = this.getNode(position)

        current!.value = value;
        return true
        
    }

    

    indexOf(value: T): number {
        let index = 0
        let current = this.head
        while(current) {
            if(current.value === value) return index
            current = this.isTail(current) ? null : current.next
            index++
        }
        return -1
    }
    remove(value: T): T | null {
        let index = this.indexOf(value)
        return this.removeAt(index)
    }

    peek(): T | undefined {
        return this.head?.value
    }

    isEmpty(): boolean {
        return this.length === 0
    }

    size(): number {
        return this.length
    }
}

const linked = new LinkedList<string>();
linked.append("aaa");
linked.append("bbb");
linked.append("ccc");
linked.traverse(); // 3 aaa -> bbb -> ccc

linked.insert("zzz", 0);
linked.insert("ddd", 2);
linked.insert("eee", 5);
linked.traverse(); // 6 zzz -> aaa -> ddd -> bbb -> ccc -> eee

console.log(linked.removeAt(0)); // zzz
console.log(linked.removeAt(1)); // ddd
console.log(linked.removeAt(3)); // eee
linked.traverse(); // 3 aaa -> bbb -> ccc

console.log(linked.get(0)); // aaa
console.log(linked.get(1)); // bbb
console.log(linked.get(2)); // ccc
console.log(linked.get(3)); // null

console.log(linked.update("aa", 0)); // true
console.log(linked.update("cc", 2)); // true
console.log(linked.update("dd", 3)); // false
linked.traverse(); // 3 aa -> bbb -> cc

console.log(linked.indexOf("aa")); // 0
console.log(linked.indexOf("ccc")); // -1

linked.remove("bbb");
linked.traverse(); // 2 aa -> cc

console.log(linked.isEmpty()); // false
```