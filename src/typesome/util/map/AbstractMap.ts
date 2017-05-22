import { AbstractCollection } from "../AbstractCollection";
import { Map } from "./Map";
import { UID } from "../UID";

export abstract class AbstractMap<K extends UID|String|Number, V> extends AbstractCollection<V> implements Map<K, V>{

}