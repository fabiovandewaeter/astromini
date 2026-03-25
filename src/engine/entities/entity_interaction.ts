// engine/entities/entity_interaction.ts
import type { DialogueState, TradeState } from "../game_state";
import { ok, type Result } from "../utils/result";
import type { World } from "../world.svelte";
import type { EntityId } from "./entity.svelte";

export type EntityInteractionContext = {
    world: World,
    source_id: EntityId,
    target_id: EntityId,
}

export type EntityInteraction = {
    id: string,
    /** exemple: visible only if player has a certain item ... */
    available?: (ctx: EntityInteractionContext) => boolean,
    execute: (ctx: EntityInteractionContext) => void,
}

export const dialogue_interaction: EntityInteraction = {
    id: "dialogue",
    execute: ({ world, source_id, target_id }): void => {
        world.start_dialogue(source_id, target_id);
    }
}

export const trade_interaction: EntityInteraction = {
    id: "trade",
    execute: ({ world, source_id, target_id }): void => {
        world.start_trade(source_id, target_id);
    }
}

export const DEFAULT_ENTITY_INTERACTIONS = [
    dialogue_interaction,
    trade_interaction
];

export function start_dialogue(world: World, source_id: EntityId, target_id: EntityId): void {
    const new_state: DialogueState = {
        mode: "dialogue",
        dialogue: {}
    };
    world.state = new_state;
}

export function start_trade(world: World, source_id: EntityId, target_id: EntityId): void {
    const new_state: TradeState = {
        mode: "trade",
        trade: {}
    };
    world.state = new_state;
}
