# **Bugs**

*Major bugs that can negatively affect a speedrun*

## **Archgun Hitbox Bug**

 Since Whispers in the Walls, a big chunk of Archguns has a bug that makes hitboxes much bigger than they should be. This bug greatly impacts Volt, as the bigger hitboxes result in Archguns hitting Profit-Taker before passing through his shield. The only solution this is to keep enough distance, see the video below.

The Archguns affected by this are: Imperator (Vandal), Corvas, (Prisma) Dual Decurions, Cyngas, Phaedra, Cortege.

Video (click to play/pause):

<div style="padding-bottom: 20px;">
<video height="100" onclick="this.paused?this.play():this.pause();arguments[0].preventDefault();" loop muted>
 <source type="video/mp4" src="/media/hitbox_bug.mp4">
</video>
</div>

Video showcasing the issue with different archguns: [Archgun issue (Youtube)](https://youtu.be/vxsFDMVjVaE?si=IVWUgNkOq3t6qFZJ)

## **Animation Bug**

The bug that most greatly affects speedrunning is the animation bug. In every run, Profit-Taker sits much lower to the ground than she did before the bug was introduced. It appears to be due to a (probably unintentional) change in how high Profit-Taker holds herself above the ground.

This bug is especially noticeable on mountain spawn, and you need to land slightly differently to account for this. Try to land closer to the railing so Profit-Taker turns and doesn’t put a leg down on the hill to her left.

Before the bug, Profit-Taker would hold herself a set distance above the ground in most animations, even if one leg was much lower than the others, as you can see in the following image and in most gifs in this guide.

<div style="width: 100%; text-align: left;">
    <img src="/media/animationbug.jpg" alt="animationbug" style="width: 100%; height: auto;">
</div>

As you can see, there is a clear view of the rear limbs, and the turret is well above the ground.

After the bug, Profit-Taker will snap into an animation that blocks your view of rear limbs during Armor Phases.

<div style="width: 100%; text-align: left;">
    <img src="/media/blockedleg.png" alt="blockedleg" style="width: 100%; height: auto;">
</div>

As you can see, Profit-Taker’s turret is completely underground and it is impossible to hit the rear legs.

Profit-Taker appears to position their right foreleg (as it is named) farther away, forcing the body lower.

Both of these images were taken during the same phase on mountain spawn.

There are many subtle (and not so subtle) differences between how Profit-Taker holds herself now vs how she used to hold herself. The exact cause is not known, but this bug is an extreme inconvenience and does not appear to be intentional.

One way to work around this issue is [__Late Start Strat__](/advanced/speedrun-strats.html#late-start-strat).

## **AoE Damage Bugs**

There are several major bugs related to weapons that deal AoE damage. Some of them are well-understood, and some aren’t.

The most noticeable AoE damage bug led to the creation of [__Ass Meta__](/advanced/speedrun-strats.html#ass-meta-with-cycron-crew). Basically, if an explosion doesn’t damage the Profit-Taker’s “head” hitbox it will do no damage. The “head” is inside the main body close to the center of Profit-Taker’s belly. Its exact location shifts depending on Profit-Taker’s animation. See [__\[Profit-Taker\] AoE weapons haven't dealt damage in the past 1.5 years. - Mission - Warframe Forums__](https://forums.warframe.com/topic/1228081-profit-taker-aoe-weapons-havent-dealt-damage-in-the-past-15-years/) for the extensive report.

<div style="width: 100%; text-align: left;">
    <img src="/media/assmeta.png" alt="assmeta" style="width: 100%; height: auto;">
</div>

Sometimes this bug combines with another bug- if you attack Profit-Taker’s legs during Shield Phase, your damage gets capped at exactly 111751 instead of the normal shield damage cap. Exactly how this interacts with AoE weapons isn’t well understood, but it is noticeable when attempting to do Viral damage with Zaw.

Another AoE damage bug is related to Archguns during Armor Phase. During this phase, an Archgun’s projectile will only damage one part of Profit-Taker. If you shoot from the wrong angle you’ll end up **doing 0 damage** if it has a wide projectile-like in the case of the Corvas Prime and Fluctus.

[__I spent $50 on the Prime Access__](https://www.youtube.com/watch?v=VvGG9xdmAwE) (rip Okayeg’s wallet)

This bug is even more noticeable on explosive weapons like the (Kuva) Grattler, Mausolon, and Ayanga. If the explosion hits both the front and back legs it will only damage the front leg, not the back leg. Fortunately for the Mausolon, the radial attack is only half the damage, and the remaining damage is sufficient; the Grattlers are not so lucky, they deal 0 damage to the rear legs if they hit the front.

## **Shield Regen bug**

When the 2nd phase body is killed, the shield will keep regenerating for 3 seconds, you may feel free to recast your abilities to pass the time or continue shooting. In cases where you have a lot of elements such as in squads, the shield will be barely visible on the health bar but it won’t go down.

## **Armor Reset bug**
also known as "Phase Skip"

Another, extremely prevalent and annoying bug is what’s known as the **Armor Reset Bug** in which an Armor Phase seemingly randomly resets when it comes time to do damage to the body, forcing you to destroy all 4 legs and the body a second (or even third) time. This can result in phase skips, more details [__here__](https://forums.warframe.com/topic/1281197-profit-taker-heist-not-granting-mission-rewards/?do=findComment&comment=12331102).

Video (click to play/pause):

<div style="padding-bottom: 20px;">
<video width="100%" onclick="this.paused?this.play():this.pause();arguments[0].preventDefault();" loop muted>
 <source type="video/mp4" src="/media/armorreset.mp4">
</video>
</div>

## **Tenet Detron Multishot Bug**

The bullets from multishot Mods on Tenet Detron use the vanilla version’s crit chance, crit damage, and base damage.

The base damage applies the formula: 40 x (1+Progenitor bonus) so you still get the Progenitor element.  
For example, 60% Tenet Detron with only Lethal Torrent (approximately 16 bullets), the base 10MS takes Tenet Detron’s stats: 26 x 1.6 base damage, 2x crit damage, 18% crit chance; the other 6MS from Lethal Torrent takes vanilla Detron’s stats: 40 x 1.6 base damage, 1.5x crit damage, 4% crit chance.

This bug only applies to the primary fire mode and does not affect the burst mode.