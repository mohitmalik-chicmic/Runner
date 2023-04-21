import { _decorator, Component, HingeConstraint, HingeJoint2D, macro, Node, quat, Quat, tween, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pendulem')
export class Pendulem extends Component {
    @property({ type: Node })
    lastNode: Node = null;
    @property({ type: Node })
    frontNode: Node = null;
    childNode: Node = null;
    lastNodeRef: any;
    frontNodeRef: any;
    pendulumChildren: Node[] = []
    movependulumSchedular: any = null;
    // q: Quat;
    // axis: Vec3;
    // angle: Vec3;
    flag: Boolean = false
    speedDep = 40
    start() {
        this.pendulumChildren = [...this.node.children];
        this.lastNodeRef = this.lastNode.getPosition();
        this.frontNodeRef = this.frontNode.getPosition();

        // this.q = quat();
        // this.axis = v3(0, 0, 1);
        // this.angle = v3(0, 0, 0);
        // var co = this;
        // tween(this.node).delay(1).call(() => {
        //     co.updateAxis();
        // }).start();

    }
    // updateAxis() {
    //     console.log("Hello World");
    //     this.axis = v3(1, 0, 0);
    // }
    update(dt) {
        for (let i = 0; i < this.node.children.length; i++) {
            this.scheduleOnce(() => {
                this.node.children[i].active = true
                this.childNode = this.node.children[i];
                var axis_z = v3(0, 0, 1);
                let tempQuat_z = new Quat();
                Quat.fromAxisAngle(tempQuat_z, axis_z, this.speedDep * dt * (3.14159 / 120));
                let nodeRot = new Quat();
                // console.log("nodeRot", nodeRot)
                let OutRot = new Quat();
                console.log("OutRot", OutRot)
                this.childNode.getRotation(nodeRot);
                let rot = this.childNode.getRotation(nodeRot);
                // console.log("initial Z pos", rot.z)
                let zPos = rot.z * 100;
                if (!this.flag) {
                    if (zPos <= -40)
                        this.speedDep = -40
                    if (zPos >= 40)
                        this.flag = true
                }
                if (this.flag) {
                    if (zPos >= 40)
                        this.speedDep = 40
                    if (zPos <= -40)
                        this.flag = false
                }
                Quat.multiply(OutRot, tempQuat_z, nodeRot);
                this.childNode.setRotation(OutRot)
                //***************************************************************** */
            })
        }
    }
    addMovependulum() {
        this.movependulumSchedular = this.schedule(() => {
            for (let i = 0; i < this.pendulumChildren.length; i++) {
                let pos = this.pendulumChildren[i].getPosition().z + 0.2
                this.pendulumChildren[i].setPosition(new Vec3(this.pendulumChildren[i].getPosition().x, this.pendulumChildren[i].getPosition().y, pos))
                if (this.pendulumChildren[i].getPosition().z >= this.frontNodeRef.z) {
                    //   console.log("inside if condition")
                    let value = Math.floor(Math.random() * (10 - 2) + 2);
                    let pendulumXPos = Math.floor(Math.random() * (3 - (-3)) + (-3));
                    //   console.log(value)
                    this.lastNodeRef.x = pendulumXPos;
                    this.lastNodeRef.z -= value
                    this.pendulumChildren[i].setPosition(this.lastNodeRef)
                }
            }
        }, 0, macro.REPEAT_FOREVER, 0)
    }

    stoppendulumMovement() {
        this.unscheduleAllCallbacks()
    }
}