function insertText($vm, params) {
  const { prefix, str = '', subfix = '' } = params;
  const { value } = $vm;
  if ($vm.selectionStart || $vm.selectionStart === 0) {
    const start = $vm.selectionStart;
    const end = $vm.selectionEnd;

    const restoreTop = $vm.scrollTop;

    if (start === end) {
      $vm.value =
        value.substring(0, start) + prefix + str + subfix + value.substring(end, value.length);
      $vm.selectionStart = start + prefix.length;
      $vm.selectionEnd = end + prefix.length + str.length;
    } else {
      $vm.value =
        value.substring(0, start) +
        prefix +
        value.substring(start, end) +
        subfix +
        value.substring(end, value.length);
      $vm.selectionStart = start + prefix.length;
      $vm.selectionEnd = end + prefix.length;
    }

    $vm.focus();
    if (restoreTop >= 0) {
      $vm.scrollTop = restoreTop;
    }
  }
  return $vm.value;
}
const replaceImg = ({ type, text, images }) => {
  switch (type) {
    case 'img':
      images.forEach((image) => {
        const imageBase64 = `![](${image.src})`;
        const imageId = `<id:${image.id}>`;
        const fromIdtoImage = new RegExp(imageId);
        text = text.replace(fromIdtoImage, imageBase64);
      });
      return text;
    case 'id':
      images.forEach((image) => {
        const fromImagetoId = `![](${image.src})`;
        const imageId = `<id:${image.id}>`;

        text = text.replace(fromImagetoId, imageId);
      });
      return text;
    default:
      return text;
  }
};

export { replaceImg, insertText };
