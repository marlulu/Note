## HTML5

---

1. ���廯
   - �ú�����ȷ�ı�ǩ��չʾ���ݣ�
   - ������������ҳ�Ŀɷ����Ժ����������Ż� (SEO) Ч������ҳ������ݽṹ�����ṹ�������������Ŷ��Ķ�����⣬ά���Ϳ�����
   - html5 ������Ԫ��
     - article������
     - aside
     - figure��ý������
     - figcaption��figure�е�˵��
     - footer
     - header
     - main���ĵ���Ҫ�Ķ������ݲ���
     - mark��ͻ��
     - nav���������Ӽ���
     - section�������ĵ�����
     - summary��details��ǩ�ı���
     - details�����۵�����
     - time��ʱ��

2. ����λ�� form �е�
   - HTML5�� form ������
     - autocomplete ��Ӧinput�е� autocomplete
     - novalidate �涨���ύ��ʱ���Ա����ݽ�����֤
   - ������Ԫ��
     - input
       - HTML5�������� type ����
         - color
         - date
         - datetime
         - datetime-local
         - email
         - month
         - number
         - range��������
         - search
         - tel���绰
         - time��ʱ��
         - url
         - week
       - HTML5 ��������
         - autocomplete �涨���������ֶ��Ƿ�Ӧ���Զ���ɣ�on�򿪣�off�ر�
         - autofocus �涨��ҳ�����ʱ input Ԫ��Ӧ���Զ���ý���
         - form �涨 input Ԫ��������һ��������
         - formaction �涨���ύ��ʱ���������ؼ����ļ��� URL������form�е� action
         - formenctype �涨����
         - formmethod �涨 HTTP ��������
         - formnovalidate �ύ��ʱ���� input Ԫ�ؽ�����֤
         - formtarget �涨�ύ��δ���Ӧ���Ḳ��form�е�target
         - list ���õ� datalist Ԫ���а����� input Ԫ�ص�Ԥ����ѡ��
         - multiple ����һ�����ϵ�ֵ������ email �� file
         - pattern ������ʽ
     - select
     - textarea
     - button
   - HTML5�����ı�Ԫ��
     - datalist
       - Ϊ input Ԫ�ع涨Ԥ����ѡ���б�
       - �û�����������������ʱ����Ԥ����ѡ��������б�
       - input Ԫ�ص� list ���Ա������� datalist Ԫ�ص� id ���ԡ�
     ```html
     # ����
     <form action="action_page.php">
        <input list="browsers">
        <datalist id="browsers">
           <option value="Internet Explorer">
           <option value="Firefox">
           <option value="Chrome">
           <option value="Opera">
           <option value="Safari">
        </datalist> 
     </form>
     ```
    
     - keygen����������������ֶΣ����ڱ���
     - output����ʾ������

3. ͼ��
   - Canvas��������
     - �滭����
       - ��ȡ canvas Ԫ��
       - ���� context ���� cxt = canvas.getContext("2d") ���ڽ��� HTML5 ����ӵ�ж��ֻ���·�������Ρ�Բ�Ρ��ַ��Լ����ͼ��ķ�����
   
   - SVG��������ʸ��ͼ�Σ�
     - ����
       - ��������Ļ���ʸ����ͼ��
       - ʹ�� XML ��ʽ����ͼ��
       - ͼ���ڷŴ��ı�ߴ���������ͼ��������������ʧ
       - ����ά�����˵ı�׼
     - ����
       - ��ͨ���ı��༭�����������޸�
       - �ɱ��������������ű�����ѹ��
       - �ǿ�������
       - ͼ������κεķֱ����±��������ش�ӡ
       - ����ͼ���������½�������±��Ŵ�
     
    - Canvas �� SVG �Ա�
      - Canvas ������
        - �����ֱ���
        - �ʺ���������
        - ����ͼ�θ�ƽ�ʽ���
        - ���ı���Ⱦ����
        - ���ʺ�ͼ���ܼ��͵���Ϸ�����е�������ᱻƵ���ػ�
        - �ܹ��� .png �� .jpg ��ʽ������ͼ��
      - SVG ������
        - �������ֱ���
        - ֧���¼�������
        - ���ֶ������ɱ༭������
        - �ʺϴ��д�����Ⱦ�����Ӧ�ó���
        - ���ʺ���ϷӦ��
        
4. ý��
   - audio ������������������
   - embed �����ⲿӦ�ó����������������
   - source ���� video �� audio ����Դ
   - track ���� video �� audio �Ĺ��
   - video ������Ƶ��ӰƬ����

5. �Ϸ�
   1. ��Ԫ������Ϊ���Ϸţ�draggable Ϊ true
   2. �Ϸŵ����ݣ�ondragstart ���Թ涨�϶�ʲô���ݣ�dataTransfer.setData()�������ñ��϶����ݵ����ͺ�ֵ
   3. �ϵ��δ���ondragover �¼��涨���϶����úδ���Ĭ�ϣ�����/Ԫ�ز��ܱ����õ�����Ԫ�أ�ʹ�� event.preventDefault() ����ֹĬ����Ϊ
   4. ���з��ã����ſ���������ʱ������ drop �¼�
   ```html
    # ����
    <!DOCTYPE HTML>
    <html>
        <head>
        <script>
            function allowDrop(ev) {
                ev.preventDefault();
            }
    
            function drag(ev) {
                ev.dataTransfer.setData("text", ev.target.id);
            }
    
            function drop(ev) {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(data));
            }
        </script>
    </head>
    <body>
        <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">
    </body>
    </html>
   ```