import * as PIXI from 'pixi.js';
import { Application, Container, Sprite, Texture } from 'pixi.js';
import { TweenMax, TimelineLite, gsap } from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';
const plugins = [PixiPlugin];
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export class CardDemo extends Container {
    private app: Application;
    private frontTexture: Texture;
    private backTexture: Texture;
    private cardContainer: Container;
    private cardStack: Sprite[] = [];

    constructor(app: Application) {
        super();
        this.app = app;

        this.cardContainer = new Container();
        this.addChild(this.cardContainer);

        this.frontTexture = this.app.loader.resources[
            'assets/front.png'
        ].texture;
        this.backTexture = this.app.loader.resources['assets/back.png'].texture;

        this.cardContainer.pivot.set(
            this.cardContainer.width / 2,
            this.cardContainer.height / 2
        );

        this.cardContainer.position.set(
            window.innerWidth / 2 - 600,
            window.innerHeight / 2 - 50
        );
        let gap = { x: 0, y: 0 };
        for (let i = 0; i < 52; i++) {
            let card = new Sprite(this.frontTexture);
            card.pivot.set(card.width / 2, card.height / 2);
            card.scale.set(0.8);
            card.position.set(gap.x, gap.y);
            card.name = `card${i}`;
            gap.x = gap.x + 5;
            gap.y = gap.y + 5;
            this.cardContainer.addChild(card);
            this.cardStack.push(card);
        }
        let index = 51;
        for (let j = 51; j >= 0; j--) {
            setTimeout(() => {
                this.flipcard(this.cardStack[index]);
                index--;
            }, j * 1000);
        }
    }

    private flipcard(card: Sprite): void {
        console.log(card.name);
        this.cardContainer.addChild(card);
        TweenMax.to(card, 0.5, {
            pixi: { scaleX: 1, scaleY: 1 },
        }).eventCallback('onComplete', () => {
            card.pivot.set(card.width, card.height / 2);
            card.x = card.x + card.width / 2;
            TweenMax.to(card, 0.5, {
                pixi: { scaleX: 0 },
            }).eventCallback('onComplete', () => {
                card.texture = this.backTexture;
                TweenMax.to(card, 0.5, {
                    pixi: { scaleX: -1, scaley: 1 },
                }).eventCallback('onComplete', () => {
                    card.x = card.x + card.width / 2;
                    card.pivot.set(card.width / 2, card.height / 2);
                    TweenMax.to(card, 0.5, {
                        pixi: { scaleX: -0.8, scaleY: 0.8 },
                    });
                });
            });
        });
    }
}
