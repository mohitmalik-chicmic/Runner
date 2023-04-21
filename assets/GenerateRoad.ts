import { _decorator, Button, Component, instantiate, log, macro, Node, NodePool, Prefab, Vec3 } from 'cc';
import { Hurdle } from './Hurdle';
const { ccclass, property } = _decorator;

@ccclass('GenerateRoad')
export class GenerateRoad extends Component {
    @property({ type: Node })
    frontRoadNode: Node = null;
    @property({ type: Node })
    lastRoadNode: Node = null;
    roadChildren: Node[] = []
    popupPool: NodePool = new NodePool();
    lastNodeRef: any
    frontNodeRef: any;
    moveRoadSchedular: any = null;
    start() {
        this.roadChildren = [...this.node.children]
        this.lastNodeRef = this.lastRoadNode.getPosition();
        this.frontNodeRef = this.frontRoadNode.getPosition();
    }
    moveRoadHurdle() {
        this.moveRoadSchedular = this.schedule(() => {
            for (let i = 0; i < this.roadChildren.length; i++) {
                let pos = this.roadChildren[i].getPosition().z + 0.3
                this.roadChildren[i].setPosition(new Vec3(this.roadChildren[i].getPosition().x, this.roadChildren[i].getPosition().y, pos))
                // console.log(this.frontRoadNode.getPosition().z, this.roadChildren[i].getPosition().z)
                if (this.roadChildren[i].getPosition().z >= this.frontNodeRef.z) {
                    //   console.log("inside if condition")
                    this.roadChildren[i].setPosition(this.lastNodeRef)
                }
            }
        }, 0, macro.REPEAT_FOREVER, 0)
    }
    stopRoadMovement(){
        this.unscheduleAllCallbacks()
    }
}
    //start() {
        // this.nodeArray = [...this.node.children]
        // this.lastNode = this.lastRoadNode.getPosition()
        // this.front = this.outFrameNode.getPosition()
        // console.log(this.nodeArray)
        // // 
        // for (let i = 0; i < this.nodeArray.length; i++) {
        //     this.arrPos.push(this.nodeArray[i].getPosition())
        // }
        // console.log(this.arrPos)
        // this.pos();
        // }
        // pos() {
        //     for (let i = 1; i < this.nodeArray.length; i++) {
        //         this.nodeArray[i].setPosition(this.arrPos[i - 1])
        //         console.log("Pos", this.nodeArray[i].name, this.nodeArray[i].getPosition())
        //     }
        //     this.arrPos = []
        //     for (let i = 0; i < this.nodeArray.length; i++) {
        //         this.arrPos.push(this.nodeArray[i].getPosition())
        //     }
        // for (let i = 1; i < this.nodeArray.length; i++) {
        //     this.prevPos = this.nodeArray[i].getPosition();
        //     if (i == 1)
        //         this.nodeArray[i].setPosition(this.nodeArray[i - 1].getPosition())
        //     this.nodeArray[i].setPosition(this.prevPos)
        //     console.log("Position", this.nodeArray[i].getPosition())
        // }
        // for (let i = 0; i < this.nodeArray.length; i++) {
        //     if (this.nodeArray[i].getPosition() == this.outFrameNode.getPosition())
        //         this.nodeArray[i].setPosition(this.lastRoadNode.getPosition())
        // }
    
    // start() {
    //     this.prevPos = this.pathNode.getPosition()
    //     for (let i = 0; i < 5; i++) {
    //         let node = instantiate(this.pathNode);
    //         this.popupPool.put(node)
    //     }
    //     for (let i = 0; i < 5; i++) {
    //         this.generate()
    //     }
    // }
    // generate() {
    //     console.log("Check if out of frame")
    //     this.roadNode = this.popupPool.get();
    //     let initialPos = this.roadNode.getPosition().z
    //     this.node.addChild(this.roadNode)
    //     this.roadNode.setPosition(this.prevPos)
    //     let pos = this.roadNode.getPosition();
    //     // pos.z = pos.z / 2
    //     pos.z = pos.z - initialPos
    //     //    pos.z = -(this.prevPos.z * count)
    //     this.prevPos = pos

    //     console.log(pos.z)
    //     this.roadNode.setPosition(pos)
    // }
    // update(deltaTime: number) {
    //     for (let i = 0; i < this.nodeArray.length; i++) {
    //         if (this.nodeArray[i].getPosition().z == this.front.z) {
    //             this.nodeArray[i].setPosition(this.lastNode)
    //             this.pos()
    //         }
    //     }
    // }

