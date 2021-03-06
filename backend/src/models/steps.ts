import { Schema, model, Types, Document } from 'mongoose';
import { MaterialModel } from './materials';

export interface IStep {
  category: Types.ObjectId;
  project: Types.ObjectId;
  step_number: number;
  img?: string;
  path?: string;
  public_path?: string;
  used_materials?: Types.ObjectId[];
  activity: Types.ObjectId;
  // description: string;
}

export interface StepDocument extends IStep, Document {
  used_materials: Types.Array<MaterialModel['_id']>;
}
export interface StepDocumentWithMaterials extends StepDocument {
  used_materials: Types.Array<MaterialModel>;
}

/*Now it can be as a type. If you want to add some 
static functions, you better change
it to interface */
export type StepModel = StepDocument;

const StepSchema = new Schema<StepDocument, StepModel>({
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  step_number: { type: Number, required: true },
  // description: { type: String },
  img: String,
  path: String,
  public_path: String,
  activity: { type: Schema.Types.ObjectId, ref: 'Step' },
  // start_time: Date,
  // stop_time: Date,
  used_materials: {
    type: [Schema.Types.ObjectId],
    ref: 'Material',
    default: []
  }
});

export const Step = model<StepDocument>('Step', StepSchema);
