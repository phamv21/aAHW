
Anagrams
Profile
Search
Anagrams
⏱ 3 hours

Anagrams
Our goal today is to write a method that determines if two given words are anagrams. This means that the letters in one word can be rearranged to form the other word. For example:

anagram?("gizmo", "sally")    #=> false
anagram?("elvis", "lives")    #=> true
Assume that there is no whitespace or punctuation in the given strings.

Learning Goals
Be able to determine the time and space complexity of a method
Be able to recognize when and how time or space complexity can be improved
Be able to compare different methods and discuss how changing inputs affects each one's overall runtime
Phase I:
Write a method #first_anagram? that will generate and store all the possible anagrams of the first string. Check if the second string is one of these.

Hints:

For testing your method, start with small input strings, otherwise you might wait a while
If you're having trouble generating the possible anagrams, look into this method.
What is the time complexity of this solution? What happens if you increase the size of the strings?

Phase II:
Write a method #second_anagram? that iterates over the first string. For each letter in the first string, find the index of that letter in the second string (hint: use Array#find_index) and delete at that index. The two strings are anagrams if an index is found for every letter and the second string is empty at the end of the iteration.

Try varying the length of the input strings. What are the differences between #first_anagram? and #second_anagram??

Phase III:
Write a method #third_anagram? that solves the problem by sorting both strings alphabetically. The strings are then anagrams if and only if the sorted versions are the identical.

What is the time complexity of this solution? Is it better or worse than #second_anagram??

Phase IV:
Write one more method #fourth_anagram?. This time, use two Hashes to store the number of times each letter appears in both words. Compare the resulting hashes.

What is the time complexity?

Bonus: Do it with only one hash.

Discuss the time complexity of your solutions together, then call over your TA to look at them.

Did you find this lesson helpful?

No

Yes
✔︎ Submit Project
Stephen_Vu_excecuting_time.zip
Download Solution
Archive your file into a .zip folder and click Submit Project to upload.

Solutions become available after uploading.