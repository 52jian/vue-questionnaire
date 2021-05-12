declare namespace Questionnaire {
  export interface INaire {
    ntitle: string,
    ntype: string,
    nintro: string,
    ndeadline: number | string
    nstatus: boolean,
    question: IQuestionItem,
    ncreattime: string,
    aid?: string,
    nid?: string,
    noptions?:string,
    nupdatetime?: string
    topic: IQuestionItem
  }

  export interface IQuestionSetting {
    last?: number
  }

  export type QuestionType = '单选' | '多选' | '文本'

  export interface IQuestionItem {
    nid?: string,
    qdescription: string,
    qisrequire: boolean,
    optionsList: IOptionItem[],
    question: string,
    setting: IQuestionSetting,
    qaddtion?: string,
    selectContent?: string,
    selectMultipleContent?: number[],
    qtype: string
}

  export interface IOptionItem {
    nid: string,
    qid: string,
    oid: string,
    ovalue: string,
    odesc: string,
    oimage: string,
    oisaddtion: boolean,
    oupdatetime: string,
    ocreatetime: string,

  }
}
