## Redux

Redux ��һ��ʹ�� 'action' �¼�����Ӧ��״̬�Ĺ���͸��µ�ģʽ�͹��߿⡣ʹ������п�Ԥ����

����׼��
1. ��һ����Դ������Ӧ�õ�ȫ�� state ��������һ��״̬���У����״̬��ֻ������Ψһһ��store��
2. State ֻ����Ψһ�ı� state �ķ������Ǵ��� action
3. ʹ�ô�����ִ���޸ģ�Ϊ������ action ��θ��� state����Ҫ��д���� reducer

����������
- ʹ�� state ������Ӧ�õ�״�������� state ����Ⱦ����ͼ��������ĳЩ�����ʱ��state ����ݷ�����������иı䣬�����µ� state�������µ� state �����µ���ͼ��

��Ҫ����
1. Action���������¼�
2. Reducer�������¼������д���
3. Store���洢���� state ״̬
4. Dispatch�����ڴ����¼� action ���� state
5. Selector���� store ������ȡ״̬

Redux ������
- ��ʼ������
  1. ʹ�ö���� root reducer ���������� Redux store
  2. store ����һ�� root reducer����������ֵ����Ϊ���ĳ�ʼֵ
  3. ����ͼ�״���Ⱦ��ʱ����ͼ������� Redux store �е� state����������ΪҪչʾ�����ݣ�ͬʱ���� store ����
- ���»���
  1. Ӧ�ó������¼�
  2. dispatch һ�� action �� Redux store
  3. store ��֮ǰ�� state �� ��ǰ�� action �ٴ����� reducer ��������������ֵ����Ϊ�µ� state
  4. store ֪ͨ���ж��Ĺ�����ͼ��store �����˸���
  5. ÿ�����Ĺ� store ����ͼ����������ǵ���Ҫ�� store �����Ƿ���Ҫ����
  6. ����Ҫ��ǿ��ʹ��������������Ⱦ������ҳ�档


Redux ��������
- ���� Redux Store
- ���� Slice Reducer �� Action
  - createSlice �ڲ��и��� immer �Ŀ⣬������ٽ��е����и��ģ�Ȼ��ʹ�ø����б���һ����ȫ�ġ����ɸ��µ�ֵ

Thunks �첽
- �� Redux ͬ��������ǰ������첽���⣬������ ajax ���������������߼���Ȼ���� dispatch action
- Thunk �������� dispatch �� getState ��Ϊ�����������첽�߼���ʹ�á�

react-thunk ������ action ������