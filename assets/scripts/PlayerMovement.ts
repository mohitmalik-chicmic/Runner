import { _decorator, Component, EventKeyboard, EventTarget, input, Input, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
enum KEY {
    SPACE = 32,
    UP = 38,
    LEFT = 37,
    RIGHT = 39
}
@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this)
    }
    onKeyDown(event: EventKeyboard) {

        //   console.log("KEY PRESSED", typeof (event.keyCode))
        // console.log(String.fromCharCode(event.keyCode))
        let pos = this.node.getPosition()
        switch (event.keyCode) {
            case 32:
            case 38:
                {
                    //  let pos = this.node.getPosition()
                    if (pos.y == 0) {
                        tween(this.node)
                            .to(0.3, { position: new Vec3(pos.x, pos.y + 7, pos.z) })
                            .to(0.9, { position: new Vec3(pos.x, 0, pos.z) })
                            .start()
                    }
                    console.log("Space Pressed")
                }
                break;
            case 37:
                {

                    //replace 5 with path width/2
                    if (pos.x > -5) {
                        //  this.node.setPosition(pos.x - 0.4, pos.y, pos.z)
                        tween(this.node)
                            .to(0.1, { position: new Vec3(pos.x - 0.6, pos.y, pos.z) })
                            .start()
                        console.log("Key Pressed");
                    }
                }
                break;
            case 39:
                if (pos.x < 5) {
                    tween(this.node)
                        .to(0.1, { position: new Vec3(pos.x + 0.6, pos.y, pos.z) })
                        .start()
                }
                break;
        }

    }
    update(deltaTime: number) {

    }
}

