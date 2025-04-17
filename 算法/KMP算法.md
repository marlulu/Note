甲：abbaabbaaba   
乙：abbaaba

在字符串（也叫主串）中的模式串（要与主串匹配的字符串）定位问题

朴素匹配算法
> 朴素匹配算法是一种暴力匹配的方式，其思想为依次 <b>枚举主串的每一个字符</b> 作为匹配模式串的起始字符，然后将两字符串的字符从起始位置一一比对，若在这个过程中出现某个字符不匹配，则将主串的起始比对位置 <b>重新回溯到上一个起始字符的下一位开始，模式串则回溯到第一个字符</b>，重新开始匹配过程。直到子串字符全部匹配成功或主串枚举完仍匹配失败为止。整个算法的时间复杂度为 O(n*m) ，效率较低。

KMP算法
> KMP算法对朴素匹配算法进行了改进，利用匹配失败时失败之前的已知部分时匹配的这个有效信息，保持主串的 i 指针不回溯，通过修改模式串（子串）的 j 指针，使模式串尽量地移动到有效的匹配位置。该算法的时间复杂度为 O（n+m）


所有要与甲匹配的字符串（称之为模式串），必须先自身匹配：对每个子字符串 [0...i]，算出其「相匹配的真前缀与真后缀中，最长的字符串的长度」。

模式串中的公共前后缀移动，使公共真前缀移动到公共真后缀的位置。

多对公共前后缀，取最长的那一对。长度要小于比较指针子串的长度。就是左侧相同子串长度。
 
## next 数组
只对模式串进行处理。

> abbaab 的头部有 a, ab, abb, abba, abbaa（不包含最后一个字符。称之为「真前缀」）   
> abbaab 的尾部有 b, ab, aab, baab, bbaab（不包含第一个字符。称之为「真后缀」）   
> 这样最长匹配是 ab。也就是说甲不回退时，乙需要回退到第三个字符去和甲继续匹配。
- 最长前缀概念： 最长前缀是说以第一个字符开始，但是不包含最后一个字符。
- 最长后缀概念： 最长后缀是说以最后一个字符开始，但是不包含第一个字符。

> 1.在串S和串T种分别设比较的起始下标i和j；   
> 
> 2.循环直到S或T的所有字符均比较完成  
> - 2.1 若S[i] = T[j]，继续比较S和T的下一个字符；
> - 2.2 否则将j向右滑动到next[j]位置，即j = next[j]；
> - 2.3 若j=-1，则将i和j分别加1，准备下一趟比较；
> 
> 3.若T中所有字符均比较完毕，则返回匹配的起始下标，否则返回-1


> next[i+1] 为找str从0到i这个子串的最大前后缀  
> 若 str[j] == str[i]，next[i+1] == j+1  
> 若 str[j] != str[i]，需要回溯到上一个最大前后缀继续比较，即 j = next[j] // 上一个最大前后缀位置
```java
class Solution {
    public int strStr(String haystack, String needle) {
        if (needle.isEmpty()) return 0;

        // 分别读取原串和匹配串的长度
        int n = haystack.length(), m = needle.length();

        char[] S = haystack.toCharArray();
        char[] T = needle.toCharArray();
        // 构建 next 数组，数组长度为匹配串的长度（next 数组是和匹配串相关的）
        int[] array = new int[m + 1];

        int[] next = getNext(T, array);

        int i = 0, j = 0;

        while (i < n && j < m) {
            if (j == -1 || S[i] == T[j]) {
                i++;
                j++;
            } else {
                j = next[j];
            }
        }

        if (j == m) {
            return (i - j);
        } else {
            return -1;
        }
    }

    public int[] getNext(char[] T, int[] next) {
        int i = 0; // i后缀
        int j = -1; // j前缀
        next[0] = -1;
        while(i < T.length) {
            if (j == -1 || T[i] == T[j]) {
                i++;
                j++;
                next[i] = j;
            } else {
                // 不相同进行回退，回退至上一个相等的位置进行比较
                j = next[j];
            }
        }

        return next;
    }
}
```

参考   
https://www.bilibili.com/video/BV1U7411f7CB/?spm_id_from=333.337.search-card.all.click   
https://www.bilibili.com/video/BV1jb411V78H/?spm_id_from=333.337.search-card.all.click&vd_source=9ae7c03c72d5c1dc80f14b4327d85f87
