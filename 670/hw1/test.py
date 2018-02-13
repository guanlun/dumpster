from sklearn.neighbors import KNeighborsClassifier

input_file = open('./intermediate_data/feature_vectors.json', 'r');
input_data = input_file.read();

"""
total_data_size = len(feature_vectors)

training_data_size = int(math.floor(total_data_size * 0.7))

training_vectors = feature_vectors[:training_data_size - 1]
training_results = results[:training_data_size - 1]

test_vectors = feature_vectors[training_data_size:]
test_results = results[training_data_size:]


print 'init'
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(training_vectors, training_results)
print 'fitted'

predict_results = knn.predict(test_vectors)
print 'predicted'

correct_predict_count = 0

for i in xrange(len(test_results)):
    if test_results[i] == predict_results[i]:
        correct_predict_count += 1
        
print "Accuracy: " + str(correct_predict_count) + " out of " + str(len(test_results))
"""
