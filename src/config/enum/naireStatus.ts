export enum NaireStatus {
  UNPUBLISHED = 'false',
  PUBLISHED = 'true'
}

export const NaireStatusText = {
  [NaireStatus.UNPUBLISHED]: '未发布',
  [NaireStatus.PUBLISHED]: '已发布'
}

export const NaireStatusColor = {
  [NaireStatus.UNPUBLISHED]: 'danger',
  [NaireStatus.PUBLISHED]: 'success'
}
