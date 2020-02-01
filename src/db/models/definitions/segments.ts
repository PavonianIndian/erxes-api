import { Document, Schema } from 'mongoose';
import { ACTIVITY_CONTENT_TYPES } from './constants';
import { field, schemaWrapper } from './utils';

export interface IAttributeFilter {
  name: string;
  operator: string;
  value: string;
}

export interface ICondition {
  type: 'property' | 'event';

  propertyName?: string;
  propertyOperator?: string;
  propertyValue?: string;

  eventName?: string;
  eventAttributeFilters?: IAttributeFilter[];
}

export interface IConditionDocument extends ICondition, Document {}

export interface ISegment {
  contentType: string;
  name: string;
  description?: string;
  subOf: string;
  color: string;
  conditions: ICondition[];
  scopeBrandIds?: string[];
}

export interface ISegmentDocument extends ISegment, Document {
  _id: string;
}

// Mongoose schemas =======================
const eventAttributeSchema = new Schema(
  {
    name: field({ type: String }),
    operator: field({ type: String }),
    value: field({ type: String }),
  },
  { _id: false },
);

export const conditionSchema = new Schema(
  {
    type: field({ type: String }),

    propertyName: field({
      type: String,
      optional: true,
      label: 'Value',
    }),

    propertyOperator: field({
      type: String,
      optional: true,
      label: 'Date unit',
    }),

    propertyValue: field({
      type: String,
      optional: true,
      label: 'Brand',
    }),

    eventName: field({
      type: String,
      optional: true,
    }),

    eventAttributeFilters: field({ type: [eventAttributeSchema] }),
  },
  { _id: false },
);

export const segmentSchema = schemaWrapper(
  new Schema({
    _id: field({ pkey: true }),
    contentType: field({
      type: String,
      enum: ACTIVITY_CONTENT_TYPES.ALL,
      label: 'Content type',
    }),
    name: field({ type: String }),
    description: field({ type: String, optional: true }),
    subOf: field({ type: String, optional: true }),
    color: field({ type: String }),
    conditions: field({ type: [conditionSchema] }),
  }),
);
