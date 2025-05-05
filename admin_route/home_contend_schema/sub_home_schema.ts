import mongoose, { Mongoose, Schema } from "mongoose";


interface sub_home_contend {
  stacks: [
    {
      title: String;
      description: string;
      image: string;
    },
    {
      title: String;
      description: string;
      image: string;
    },
    {
      title: String;
      description: string;
      image: string;
    },
    {
      title: String;
      description: string;
      image: string;
    }
  ];
}

const homeSub_Schema = new Schema<sub_home_contend>({
  stacks: [
  
    {
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
    },
    {
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
    },
    {
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
    },
    {
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },
    },
  ],
});

const home_sub_content = mongoose.model<sub_home_contend>(
  "sub_home_content",
  homeSub_Schema
);
export default home_sub_content;
