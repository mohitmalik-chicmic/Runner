import { _decorator, BoxCollider, CircleCollider2D, Collider2D, Component, Contact2DType, CylinderCollider, director, ICollisionEvent, IPhysics2DContact, Node, PhysicsSystem2D, RigidBody } from 'cc';
const { ccclass, property } = _decorator;
enum CarGroup {
    NORMAL = 1 << 0,
    MAIN_CAR = 1 << 1,
    OTHER_CAR = 1 << 2,
}
@ccclass('Collider')

export class Collider extends Component {

    character: any = null;
    box: any = null;
    @property({ type: Node })
    hurdle: Node = null;
    @property({ type: Node })
    hurdle1: Node = null;
    start() {
        const collider = this.node.getComponent(BoxCollider)!;
        collider.on('onCollisionEnter', this._onCollisionEnter, this);
    }
    private _onCollisionEnter(event: ICollisionEvent) {
        const otherCollider = event.otherCollider;
        // console.log("Collider Event", event)
        // console.log("Collider  Self Event", event.selfCollider)
        // console.log(otherCollider.node.name)
        if (otherCollider.node.name === 'group') {
            console.log("Other")
        }
        else {
            console.log("Collision Occured");

        }
    }
}

