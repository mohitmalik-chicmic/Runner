import { _decorator, Component, macro, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hurdle')
export class Hurdle extends Component {
    @property({ type: Node })
    lastNode: Node = null;
    @property({ type: Node })
    frontNode: Node = null;
    lastNodeRef: any;
    frontNodeRef: any;
    hurdleChildren: Node[] = []
    moveHurdleSchedular: any = null;
    start() {
        this.hurdleChildren = [...this.node.children];
        this.lastNodeRef = this.lastNode.getPosition();
        this.frontNodeRef = this.frontNode.getPosition();
    }
    addMoveHurdle() {
        this.moveHurdleSchedular = this.schedule(() => {
            for (let i = 0; i < this.hurdleChildren.length; i++) {
                let pos = this.hurdleChildren[i].getPosition().z + 0.2
                this.hurdleChildren[i].setPosition(new Vec3(this.hurdleChildren[i].getPosition().x, this.hurdleChildren[i].getPosition().y, pos))
                // console.log(this.frontRoadNode.getPosition().z, this.hurdleChildren[i].getPosition().z)
                if (this.hurdleChildren[i].getPosition().z >= this.frontNodeRef.z) {
                    //   console.log("inside if condition")
                    let value = Math.floor(Math.random() * (10 - 2) + 2);
                    let hurdleXPos = Math.floor(Math.random() * (3 - (-3)) + (-3));
                    //   console.log(value)
                    this.lastNodeRef.x = hurdleXPos;
                    this.lastNodeRef.z -= value
                    this.hurdleChildren[i].setPosition(this.lastNodeRef)
                }
            }
        }, 0, macro.REPEAT_FOREVER, 0)
    }
    stopHurdleMovement() {
        this.unscheduleAllCallbacks()
    }
    update(deltaTime: number) {
    }
}

