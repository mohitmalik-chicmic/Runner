import { _decorator, Button, Component, instantiate, macro, Node, NodePool, Prefab, tween, Vec3 } from 'cc';
import { GenerateRoad } from './GenerateRoad';
import { Hurdle } from './Hurdle';
import { Pendulem } from './Pendulem';
const { ccclass, property } = _decorator;

@ccclass('handle')
export class handle extends Component {
    @property({ type: Node })
    roadNode: Node = null;
    @property({ type: Node })
    hurdleNode: Node = null;
    @property({ type: Node })
    pendulumNode: Node = null;
    @property({ type: Button })
    startButton: Button = null;
    @property({ type: Button })
    stopButton: Button = null;
    onStartRun() {
        this.startButton.interactable = false
        this.roadNode.getComponent(GenerateRoad).moveRoadHurdle();
        this.hurdleNode.getComponent(Hurdle).addMoveHurdle();
        this.pendulumNode.getComponent(Pendulem).addMovependulum();
    }
    stopRun() {
        this.startButton.interactable = true
        this.roadNode.getComponent(GenerateRoad).stopRoadMovement();
        this.hurdleNode.getComponent(Hurdle).stopHurdleMovement();
        this.pendulumNode.getComponent(Pendulem).stoppendulumMovement();
    }
    // changePosition() {
    //     for (let i = 0; i < this.roadChildren.length; i++) {
    //         let pos = this.roadChildren[i].getPosition().z + 1
    //         this.roadChildren[i].setPosition(new Vec3(this.roadChildren[i].getPosition().x, this.roadChildren[i].getPosition().y, pos))
    //         // console.log(this.frontRoadNode.getPosition().z, this.roadChildren[i].getPosition().z)
    //         if (this.roadChildren[i].getPosition().z >= this.frontNodeRef.z) {
    //             //   console.log("inside if condition")
    //             this.roadChildren[i].setPosition(this.lastNodeRef)
    //         }
    //     }
    // }
    //Done Using node pool
    // generateCube() {
    //     let value = Math.floor(Math.random() * (this.lastNodeRef.z - this.frontNodeRef.z) + this.frontNodeRef.z);
    //     let cube = this.popupPool.get()
    //     this.roadNode.addChild(cube)
    //     // for (let i = 0; i < 5; i++) {
    //     cube.setPosition(new Vec3(cube.getPosition().x, cube.getPosition().y, value));
    //     let pos = cube.getPosition().z + 1
    //     cube.setPosition(new Vec3(cube.getPosition().x, cube.getPosition().y, pos));
    //     if (cube.getPosition().z >= this.frontNodeRef.z) {
    //         this.popupPool.put(cube)
    //     }
    //     // }

    // }
    update() {
    }
}